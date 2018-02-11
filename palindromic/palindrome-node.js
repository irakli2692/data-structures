class PalindromeNode {
  constructor(text, startIndex, maxSuffixNode) {
    this.text = text

    this.startIndices = []
    if (startIndex != null) {
      this.startIndices.push(startIndex)
      this.lastStartIndex = this.startIndex
    }

    this.maxSuffixNode = maxSuffixNode
    this.nextNodesMap = new Map()
  }

  get length() {
    return this.text.length
  }

  get occurences() {
    return this.startIndices.length
  }

  useForNewOccurence(newStartIndex) {
    this.startIndices.push(newStartIndex)

    this.lastStartIndex = newStartIndex
  }

  isAppropriateNode(letter, index, fullString) {
    let previousIndex = this.previousIndex(index)

    return previousIndex >= 0 &&
      fullString[previousIndex] === letter
  }

  hasLabeledEdge(letter) {
    return this.nextNodesMap.has(letter)
  }

  useLabeledEdgeNode(letter, lastIndex) {
    let node = this.nextNodesMap.get(letter)

    let newStartIndex = this.previousIndex(lastIndex)

    node.useForNewOccurence(newStartIndex)
  }

  registerNewNode(letter, node) {
    this.nextNodesMap.set(letter, node)
  }

  newNodeText(letter) {
    return letter + this.text + letter
  }

  addLetter(letter, index, fullString) {
    let previousIndex = this.previousIndex(index)

    if (previousIndex >= 0 &&
      fullString[previousIndex] === letter) {
      return this.createNodeIfNotExists(letter, index, fullString)
    }

    return this.maxSuffixNode.addLetter(letter, index, fullString)
  }

  createNodeIfNotExists(letter, index, fullString) {
    let startIndex = this.previousIndex(index)

    if (this.nextNodesMap.has(letter)) {
      let nextNode = this.nextNodesMap.get(letter)

      nextNode.useForNewOccurence(startIndex)

      return nextNode
    }

    let suffixNode = this.getMaxSuffixNewNode(letter, index, fullString)

    let newText = letter + this.text + letter

    return new PalindromeNode(newText, startIndex, suffixNode)
  }

  previousIndex(index) {
    return index - 1 - this.length
  }

  getMaxSuffixNewNode(letter, index, fullString) {
    return this.maxSuffixNode.addLetter(letter, index, fullString)
  }

}

module.exports = PalindromeNode;
