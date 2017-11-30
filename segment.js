function leftChildIndex(index) {
  return index * 2 + 1;
}

function rightChildIndex(index) {
  return index * 2 + 2;
}

class SegmentTree {
  constructor(array) {
    this.tree = new Array(4 * array.length);

    this.build(array, 0, this.tree.length - 1, 0); //whole array. sum node is at 0 index
  }

  private build(array, start, end, nodeIndex) {
    if (start === end) {
      this.tree[nodeIndex] = array[start];

      return this.tree[nodeIndex];
    }

    let middle = start + Math.floor((end - start) / 2);

    this.tree[nodeIndex] =
      this.build(array, start, middle, leftChildIndex(nodeIndex)) +
      this.build(array, middle + 1, end, rightChildIndex(nodeIndex));

    return this.tree[nodeIndex];
  }

  closedIntervalSum(start, end) {
    
  }
}
