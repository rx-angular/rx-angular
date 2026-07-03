const chunks = [
  'dist/apps/rebundle-demo/browser/chunk-1234.js',
  'dist/apps/rebundle-demo/browser/chunk-5678.js',
];
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
const regex = new RegExp(chunks.map(escapeRegExp).join('|'), 'g');
const basename = 'chunk-1234.js';
console.log('Matches basename:', regex.test(basename));
console.log('Matches fullpath:', regex.test(chunks[0]));
