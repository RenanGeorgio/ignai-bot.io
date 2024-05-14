export default function compareArrays(a: [], b: []) {
  return JSON.stringify(a) === JSON.stringify(b);
};