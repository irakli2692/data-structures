const FenwickTree = require('./fenwick/fenwick')
const SegmentTree = require('./segment/segment')
const PalindromicTree = require('./palindromic/palindromic')

let array = [2, 5, 7, 2, 1, 9, 4, 1, 2, 11, 80, 32]

let fenwick = new FenwickTree(array)

console.log(fenwick.closedIntervalSum(2, 10))

fenwick.add(5, 11) // 9 -> 20

console.log(fenwick.closedIntervalSum(2, 10))

let segmentTree = new SegmentTree(array)

console.log(segmentTree.closedIntervalSum(2, 10))

segmentTree.updateValue(5, 20)

console.log(segmentTree.closedIntervalSum(2, 10))

let str = 'acabaca'

let palindromic = new PalindromicTree(str)

console.log(palindromic.palindromeSubstrings)
console.log(palindromic.numberOfPalindromeSubstrings)
console.log(palindromic.palindromeSubstringIndices)
