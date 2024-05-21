export default function compareArrays(a: any[], b: any[]) {
  return JSON.stringify(a) === JSON.stringify(b);
};