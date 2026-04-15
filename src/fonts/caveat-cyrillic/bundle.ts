// Custom Caveat bundle with Cyrillic glyph data for tegaki
import fontUrl from './caveat.ttf?url';
import glyphData from './glyphData.json';

const bundle = {
  family: 'Caveat',
  lineCap: 'round',
  fontUrl,
  fontFaceCSS: `@font-face { font-family: 'Caveat'; src: url(${fontUrl}); }`,
  unitsPerEm: 1000,
  ascender: 960,
  descender: -300,
  glyphData,
} as const;

export default bundle;
