class PalindromeNode {
  constructor(text, startIndex, maxSuffixNode) {
    this.text = text

    this.startIndices = []
    if (startIndex != null) {
      this.startIndices.push(startIndex)
      this.lastStartIndex = this.startIndex
    }

    this.maxSuffixNode = maxSuffixNode
  }

  
}
