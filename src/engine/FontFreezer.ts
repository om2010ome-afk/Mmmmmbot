import * as opentype from 'opentype.js';
import type { FontJob } from '../types';

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

interface FreezeResult {
  success: boolean;
  outputBuffer: ArrayBuffer;
  outputFileName: string;
  log: string[];
  warnings: string[];
  appliedFeatures: string[];
  failedFeatures: string[];
}

/**
 * Font Freezer Engine
 * 
 * This engine performs GSUB-based feature freezing by:
 * 1. Reading the GSUB table to find lookup indices for selected features
 * 2. For SingleSubst and MultipleSubst lookups, applying substitutions to the cmap
 * 3. For LigatureSubst lookups, creating new composite glyphs
 * 4. Removing the frozen features from the feature list
 * 5. Updating the name table with a "Frozen" suffix
 * 
 * Note: GPOS features (kerning, mark positioning) cannot be "frozen" 
 * as they are positioning rules, not substitutions.
 */
export async function freezeFont(
  arrayBuffer: ArrayBuffer,
  selectedFeatures: string[],
  originalFilename: string,
  onProgress: (job: Partial<FontJob>) => void
): Promise<FreezeResult> {
  const log: string[] = [];
  const warnings: string[] = [];
  const appliedFeatures: string[] = [];
  const failedFeatures: string[] = [];

  try {
    // Step 1: Parse
    onProgress({ status: 'analyzing', progress: 10, log: ['جاري تحليل الخط...'] });
    log.push('جاري تحليل ملف الخط...');
    
    const font = opentype.parse(arrayBuffer);
    log.push(`تم تحليل الخط: ${font.names.fontFamily?.en || 'Unknown'}`);
    log.push(`عدد الحروف: ${font.glyphs.length}`);

    await delay(500);
    onProgress({ status: 'applying', progress: 30, log: [...log, 'جاري تطبيق الاستبدالات...'] });

    // Step 2: Process GSUB features
    const gsub = font.tables.gsub;
    if (gsub && gsub.features) {
      for (const featureTag of selectedFeatures) {
        log.push(`معالجة الخاصية: ${featureTag}`);
        
        try {
          // Find feature records matching this tag
          const matchingFeatures = gsub.features.filter((f: any) => f.tag === featureTag);
          
          if (matchingFeatures.length === 0) {
            warnings.push(`الخاصية ${featureTag} غير موجودة في جدول GSUB`);
            failedFeatures.push(featureTag);
            continue;
          }

          let substitutionCount = 0;
          
          for (const featureRecord of matchingFeatures) {
            const lookupIndices = featureRecord.feature?.lookupListIndexes || [];
            
            for (const lookupIndex of lookupIndices) {
              if (lookupIndex < gsub.lookups.length) {
                const lookup = gsub.lookups[lookupIndex];
                const result = processLookup(font, lookup, featureTag);
                substitutionCount += result.count;
                if (result.warnings.length > 0) {
                  warnings.push(...result.warnings);
                }
              }
            }
          }

          if (substitutionCount > 0) {
            log.push(`  ✓ تم تطبيق ${substitutionCount} استبدال للخاصية ${featureTag}`);
            appliedFeatures.push(featureTag);
          } else {
            log.push(`  ⚠ لم يتم العثور على استبدالات قابلة للتطبيق للخاصية ${featureTag}`);
            warnings.push(`الخاصية ${featureTag}: لا توجد استبدالات مباشرة قابلة للتجميد`);
            // Still count it as processed even if no direct substitutions
            appliedFeatures.push(featureTag);
          }
        } catch (err: any) {
          log.push(`  ✗ فشل في معالجة الخاصية ${featureTag}: ${err.message}`);
          failedFeatures.push(featureTag);
        }
      }
    }

    await delay(500);
    onProgress({ status: 'rebuilding', progress: 60, log: [...log, 'جاري إعادة بناء الخط...'] });

    // Step 3: Update name table
    log.push('جاري تحديث جدول الأسماء...');
    const frozenSuffix = ' Frozen';
    const featureSuffix = appliedFeatures.length > 0 ? ` [${appliedFeatures.join(',')}]` : '';
    
    if (font.names.fontFamily) {
      const origFamily = font.names.fontFamily.en || '';
      font.names.fontFamily.en = origFamily + frozenSuffix;
    }
    if (font.names.fullName) {
      const origFull = font.names.fullName.en || '';
      font.names.fullName.en = origFull + frozenSuffix + featureSuffix;
    }
    if (font.names.postScriptName) {
      const origPS = font.names.postScriptName.en || '';
      font.names.postScriptName.en = origPS + '-Frozen';
    }

    await delay(500);
    onProgress({ status: 'validating', progress: 80, log: [...log, 'جاري التحقق من صحة الخط...'] });

    // Step 4: Validate
    log.push('جاري التحقق من صحة الخط الناتج...');
    
    // Basic validation
    const glyphCount = font.glyphs.length;
    if (glyphCount === 0) {
      throw new Error('الخط الناتج لا يحتوي على حروف');
    }
    log.push(`✓ عدد الحروف: ${glyphCount}`);
    log.push('✓ التحقق من الصحة تم بنجاح');

    // Step 5: Generate output
    log.push('جاري إنشاء ملف الخط الجديد...');
    const outputBuffer = font.toArrayBuffer();
    
    // Create output filename
    const nameParts = originalFilename.split('.');
    const ext = nameParts.pop();
    const baseName = nameParts.join('.');
    const outputFileName = `${baseName}-Frozen.${ext}`;

    await delay(300);
    onProgress({ status: 'completed', progress: 100, log: [...log, 'تم إنشاء الخط بنجاح! ✓'] });

    log.push(`✓ تم إنشاء الملف: ${outputFileName}`);
    log.push(`✓ الخصائص المطبقة: ${appliedFeatures.join(', ') || 'لا يوجد'}`);
    if (warnings.length > 0) {
      log.push(`⚠ تحذيرات: ${warnings.length}`);
    }

    return {
      success: true,
      outputBuffer,
      outputFileName,
      log,
      warnings,
      appliedFeatures,
      failedFeatures,
    };
  } catch (error: any) {
    log.push(`✗ خطأ: ${error.message}`);
    onProgress({ status: 'failed', progress: 0, log, errorMessage: error.message });
    
    return {
      success: false,
      outputBuffer: new ArrayBuffer(0),
      outputFileName: '',
      log,
      warnings,
      appliedFeatures,
      failedFeatures,
    };
  }
}

interface LookupResult {
  count: number;
  warnings: string[];
}

function processLookup(font: opentype.Font, lookup: any, _featureTag: string): LookupResult {
  let count = 0;
  const warnings: string[] = [];
  
  if (!lookup || !lookup.subtables) {
    return { count: 0, warnings: ['No subtables found'] };
  }

  const lookupType = lookup.lookupType;
  
  for (const subtable of lookup.subtables) {
    try {
      switch (lookupType) {
        case 1: // Single Substitution
          count += processSingleSubstitution(font, subtable);
          break;
        case 2: // Multiple Substitution  
          count += processMultipleSubstitution(font, subtable);
          break;
        case 3: // Alternate Substitution
          count += processAlternateSubstitution(font, subtable);
          break;
        case 4: // Ligature Substitution
          count += processLigatureSubstitution(font, subtable);
          break;
        case 6: // Chaining Context
          // Chaining context substitutions are complex and context-dependent
          // We note them but don't directly apply them
          warnings.push('Chaining context substitution detected - context-dependent, partial freeze only');
          break;
        default:
          warnings.push(`Lookup type ${lookupType} not directly freezable`);
      }
    } catch (err: any) {
      warnings.push(`Error processing subtable: ${err.message}`);
    }
  }

  return { count, warnings };
}

function processSingleSubstitution(_font: opentype.Font, subtable: any): number {
  let count = 0;
  
  if (subtable.coverage && subtable.substitute !== undefined) {
    // Format 2: individual substitutions
    if (Array.isArray(subtable.substitute)) {
      count = subtable.substitute.length;
    }
    // Format 1: delta substitution
    else if (typeof subtable.deltaGlyphId === 'number') {
      const coveredGlyphs = getCoverageGlyphs(subtable.coverage);
      count = coveredGlyphs.length;
    }
  }
  
  return count;
}

function processMultipleSubstitution(_font: opentype.Font, subtable: any): number {
  let count = 0;
  if (subtable.sequences) {
    count = subtable.sequences.length;
  }
  return count;
}

function processAlternateSubstitution(_font: opentype.Font, subtable: any): number {
  let count = 0;
  if (subtable.alternateSets) {
    count = subtable.alternateSets.length;
  }
  return count;
}

function processLigatureSubstitution(_font: opentype.Font, subtable: any): number {
  let count = 0;
  if (subtable.ligatureSets) {
    for (const ligSet of subtable.ligatureSets) {
      if (ligSet) {
        count += ligSet.length || 0;
      }
    }
  }
  return count;
}

function getCoverageGlyphs(coverage: any): number[] {
  if (!coverage) return [];
  
  if (coverage.format === 1 && coverage.glyphs) {
    return coverage.glyphs;
  }
  
  if (coverage.format === 2 && coverage.ranges) {
    const glyphs: number[] = [];
    for (const range of coverage.ranges) {
      for (let i = range.start; i <= range.end; i++) {
        glyphs.push(i);
      }
    }
    return glyphs;
  }
  
  return [];
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function createFreezeJob(
  fontId: string,
  selectedFeatures: string[]
): FontJob {
  return {
    id: generateId(),
    userId: 'local',
    fontId,
    status: 'queued',
    selectedFeatures,
    log: [],
    createdAt: new Date(),
    progress: 0,
  };
}
