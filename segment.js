const ClosedInterval = require('./interval');

function leftChildIndex(index) {
  return index * 2 + 1;
}

function rightChildIndex(index) {
  return index * 2 + 2;
}

function intervalMiddle(start, end) {
  return start + Math.floor((end - start) / 2);
}

class SegmentTree {
  constructor(array) {
    this.tree = new Array(4 * array.length);
    this.wholeInterval = new ClosedInterval(0, this.tree.length - 1);
    this.wholeSumIndex = 0;

    this.build(
      array,
      this.wholeInterval,
      this.wholeSumIndex
    );
  }

  private build(array, interval, nodeIndex) {
    if (interval.isSingleElement()) {
      this.tree[nodeIndex] = array[interval.start];

      return this.tree[nodeIndex];
    }

    this.tree[nodeIndex] =
      this.build(array, interval.leftHalfInterval, leftChildIndex(nodeIndex)) +
      this.build(array, interval.rightHalfInterval, rightChildIndex(nodeIndex));

    return this.tree[nodeIndex];
  }

  closedIntervalSum(start, end) {
    let queryInterval = new ClosedInterval(start, end);

    return this.sumFromNodes(this.wholeInterval, queryInterval, this.wholeSumIndex);
  }

  private sumFromNodes(nodeInterval, queryInterval, nodeIndex) {
    if (queryInterval.isInside(nodeInterval)) {
      return this.tree[nodeIndex];
    }

    if (queryInterval.isOutside(nodeInterval)) {
      return 0;
    }

    // query interval is partially inside node interval

    return this.sumFromNodes(nodeInterval.leftHalfInterval, queryInterval, leftChildIndex(nodeIndex)) +
      this.sumFromNodes(nodeInterval.rightHalfInterval, queryInterval, rightChildIndex(nodeIndex));
  }

  updateValue(index, newValue) {
    this.updateNodes(this.wholeInterval, index, newValue, this.wholeSumIndex);
  }

  private updateNodes(nodeInterval, index, newValue, nodeIndex) {
    if (!nodeInterval.has(index)) return this.tree[nodeIndex];

    if (nodeInterval.isSingleElement() && nodeInterval.start === index) {
      this.tree[nodeIndex] = newValue;

      return this.tree[nodeIndex];
    }

    this.tree[nodeIndex] =
      this.updateNodes(nodeInterval.leftHalfInterval, index, newValue, leftChildIndex(nodeIndex)) +
      this.updateNodes(nodeInterval.rightHalfInterval, index, newValue, rightChildIndex(nodeIndex));

    return this.tree[nodeIndex];
  }

}

module.exports = SegmentTree;
