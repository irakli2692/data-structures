class PalindromeNode {
  constructor(text, startIndex, maxSuffixNode) {
    this.text = text

    this.startIndices = []
    if (startIndex != null) {
      this.startIndices.push(startIndex)
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

    let item = node
    let startIndex = newStartIndex

    while (item.length > 0) {
      item.useForNewOccurence(startIndex)

      item = item.maxSuffixNode
      startIndex = lastIndex - item.length + 1 // suffix's new start index
    }
  }

  getLabeledEdgeNode(letter) {
    return this.nextNodesMap.get(letter)
  }

  registerNewNode(letter, node) {
    this.nextNodesMap.set(letter, node)
  }

  newNodeText(letter) {
    return letter + this.text + letter
  }

  previousIndex(index) {
    return index - 1 - this.length
  }

}

module.exports = PalindromeNode;
