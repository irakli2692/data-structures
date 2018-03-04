const PalindromeNode = require('./palindrome-node')

const imaginaryNode = require('./imaginary-node')

const zeroNode = new PalindromeNode('', null, imaginaryNode)

class PalindromicTree {
  constructor(fullText) {
    this.nodes = []
    this.currentNode = imaginaryNode
    this.fullText = fullText

    this.build()
  }

  build() {
    if (this.fullText.length === 0) return

    let firstletter = this.fullText[0]

    this.currentNode = new PalindromeNode(firstletter, 0, zeroNode)
    this.nodes.push(this.currentNode)

    imaginaryNode.registerNewNode(firstletter, this.currentNode)

    for (let i = 1; i < this.fullText.length; i++) {
      let letter = this.fullText[i]

      let node = this.getNextAppropriateNode(this.currentNode, letter, i)

      if (node.hasLabeledEdge(letter)) {
        node.useLabeledEdgeNode(letter, i)
        continue
      }

      let suffixNode

      if (node.length < 0) {
        suffixNode = zeroNode
      } else {
        let oldSuffixNode = this.getNextAppropriateNode(node.maxSuffixNode, letter, i)

        oldSuffixNode.useLabeledEdgeNode(letter, i)

        suffixNode = oldSuffixNode.getLabeledEdgeNode(letter)
      }

      let newText = node.newNodeText(letter)
      let startIndex = node.previousIndex(i)
      this.currentNode = new PalindromeNode(newText, startIndex, suffixNode)

      this.nodes.push(this.currentNode)
      node.registerNewNode(letter, this.currentNode)
    }
  }

  getNextAppropriateNode(fromNode, letter, index) {
    let node = fromNode

    while (!node.isAppropriateNode(letter, index, this.fullText)) {
      node = node.maxSuffixNode
    }

    return node
  }

  get palindromeSubstrings() {
    return this.nodes.map(node => node.text)
  }

  get numberOfPalindromeSubstrings() {
    return this.nodes
      .map(node => node.occurences)
      .reduce((sum, currentValue) => sum + currentValue, 0)
  }

  get palindromeSubstringIndices() {
    return this.nodes
      .map(node => {
        return node.startIndices.map(index => [index, index + node.length])
      })
      .reduce((accumulator, indices) => accumulator.concat(indices), [])
  }
}

module.exports = PalindromicTree
