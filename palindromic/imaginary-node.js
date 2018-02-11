const PalindromeNode = require('./palindrome-node')

const imaginaryNodeObject = {
  maxSuffixNode: this,
  nextNodesMap: new Map(),
  get length() {
    return -1
  },
  get occurences() {
    return 0
  },
  useForNewOccurence() {},
  isAppropriateNode() {
    return true
  },
  newNodeText(letter) {
    return letter
  },
  previousIndex(index) {
    return index
  }
}

module.exports = Object.create(PalindromeNode.prototype, imaginaryNodeObject)
