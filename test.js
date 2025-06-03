const assert = require('assert');
const calculateParts = require('./splitter');

const tests = [
  { word: '', expected: { part1: '', part2: '', part3: '' } },
  { word: 'a', expected: { part1: 'a', part2: '', part3: '' } },
  { word: 'ab', expected: { part1: 'a', part2: '', part3: 'b' } },
  { word: 'abc', expected: { part1: 'a', part2: 'b', part3: 'c' } },
  { word: 'abcd', expected: { part1: 'ab', part2: 'c', part3: 'd' } },
  { word: 'abcde', expected: { part1: 'ab', part2: 'c', part3: 'de' } },
  { word: 'abcdef', expected: { part1: 'ab', part2: 'cd', part3: 'ef' } }
];

for (const { word, expected } of tests) {
  const result = calculateParts(word);
  assert.deepStrictEqual(result, expected, `Failed on word: ${word}`);
}

console.log('All tests passed.');
