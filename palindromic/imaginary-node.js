const PalindromeNode = require('./palindrome-node')

let imaginaryNode = Object.create(PalindromeNode.prototype)

imaginaryNode.maxSuffixNode = imaginaryNode
imaginaryNode.nextNodesMap = new Map()
imaginaryNode.useForNewOccurence = function () {}
imaginaryNode.isAppropriateNode = function () {
  return true
}
imaginaryNode.newNodeText = function (letter) {
  return letter
}
imaginaryNode.previousIndex = function (index) {
  return index
}

Object.defineProperties(imaginaryNode, {
  length: {
    get: function () {
      return -1
    }
  },
  occurences: {
    get: function () {
      return 0
    }
  }
})

module.exports = imaginaryNode
