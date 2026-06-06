import * as opentype from 'opentype.js';
import type { FontFile, OpenTypeFeature } from '../types';
import { FEATURE_INFO } from '../types';

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function analyzeFont(file: File): Promise<{ fontInfo: FontFile; features: OpenTypeFeature[]; font: opentype.Font }> {
  const arrayBuffer = await file.arrayBuffer();
  const font = opentype.parse(arrayBuffer);
  
  // Extract name table info
  const names = font.names;
  const fontFamily = names.fontFamily?.en || names.fontFamily?.ar || file.name.replace(/\.(ttf|otf)$/i, '');
  const fontSubfamily = names.fontSubfamily?.en || 'Regular';
  const fullName = names.fullName?.en || fontFamily;
  const postScriptName = names.postScriptName?.en || fontFamily.replace(/\s/g, '-');
  const version = names.version?.en || '1.0';
  
  // Determine format
  const ext = file.name.split('.').pop()?.toLowerCase();
  const format = ext === 'otf' ? 'otf' : 'ttf';
  
  // Get table names
  const tables: string[] = [];
  const tableData = font.tables;
  if (tableData) {
    for (const key of Object.keys(tableData)) {
      tables.push(key);
    }
  }
  
  // Check common tables
  const hasGSUB = !!tableData.gsub;
  const hasGPOS = !!tableData.gpos;
  const hasCmap = !!tableData.cmap;
  const hasKern = !!(tableData as any).kern || hasGPOS;
  const hasName = !!tableData.name;
  const hasOS2 = !!tableData.os2;
  
  // Get metrics
  const glyphCount = font.glyphs.length;
  const unitsPerEm = font.unitsPerEm;
  const ascender = font.ascender;
  const descender = font.descender;

  const fontInfo: FontFile = {
    id: generateId(),
    userId: 'local',
    originalFilename: file.name,
    fontFamily,
    fontSubfamily,
    fontFullName: fullName,
    postScriptName,
    version,
    format: format as 'ttf' | 'otf',
    fileSize: file.size,
    glyphCount,
    unitsPerEm,
    ascender,
    descender,
    tables,
    hasGSUB,
    hasGPOS,
    hasCmap,
    hasKern,
    hasName,
    hasOS2,
    status: 'ready',
    createdAt: new Date(),
    file,
    arrayBuffer,
  };

  // Extract OpenType features
  const features = extractFeatures(font);

  return { fontInfo, features, font };
}

function extractFeatures(font: opentype.Font): OpenTypeFeature[] {
  const features: OpenTypeFeature[] = [];
  const featureTags = new Set<string>();
  
  // Extract from GSUB
  const gsub = font.tables.gsub;
  if (gsub && gsub.features) {
    for (const feature of gsub.features) {
      const tag = feature.tag;
      if (!featureTags.has(tag)) {
        featureTags.add(tag);
        const info = FEATURE_INFO[tag];
        features.push({
          tag,
          name: info?.name || tag.toUpperCase(),
          nameAr: info?.nameAr || tag,
          description: info?.description || `OpenType feature: ${tag}`,
          descriptionAr: info?.descriptionAr || `خاصية OpenType: ${tag}`,
          tableType: 'GSUB',
          supported: true,
          canFreeze: info?.canFreeze ?? true,
          lookupCount: feature.feature?.lookupListIndexes?.length || 0,
          scripts: [],
        });
      }
    }
  }
  
  // Extract from GPOS
  const gpos = font.tables.gpos;
  if (gpos && gpos.features) {
    for (const feature of gpos.features) {
      const tag = feature.tag;
      if (!featureTags.has(tag)) {
        featureTags.add(tag);
        const info = FEATURE_INFO[tag];
        features.push({
          tag,
          name: info?.name || tag.toUpperCase(),
          nameAr: info?.nameAr || tag,
          description: info?.description || `OpenType feature: ${tag}`,
          descriptionAr: info?.descriptionAr || `خاصية OpenType: ${tag}`,
          tableType: 'GPOS',
          supported: true,
          canFreeze: info?.canFreeze ?? false,
          lookupCount: feature.feature?.lookupListIndexes?.length || 0,
          scripts: [],
        });
      }
    }
  }
  
  // Sort: GSUB first, then GPOS
  features.sort((a, b) => {
    if (a.tableType !== b.tableType) return a.tableType === 'GSUB' ? -1 : 1;
    return a.tag.localeCompare(b.tag);
  });
  
  return features;
}

export function createFontPreviewUrl(file: File): string {
  const blob = new Blob([file], { type: file.type || 'font/ttf' });
  return URL.createObjectURL(blob);
}

export function createFontPreviewUrlFromBuffer(buffer: ArrayBuffer, format: string): string {
  const mimeType = format === 'otf' ? 'font/otf' : 'font/ttf';
  const blob = new Blob([buffer], { type: mimeType });
  return URL.createObjectURL(blob);
}
