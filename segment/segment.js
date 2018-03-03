const ClosedInterval = require('./interval');

function leftChildIndex(index) {
  return index * 2 + 1;
}

function rightChildIndex(index) {
  return index * 2 + 2;
}

class SegmentTree {
  constructor(array) {
    this.tree = new Array(4 * array.length);
    this.wholeInterval = new ClosedInterval(0, array.length - 1);
    this.wholeSumIndex = 0;

    this._build(
      array,
      this.wholeInterval,
      this.wholeSumIndex
    );
  }

  _build(array, interval, nodeIndex) {
    if (interval.isSingleElement()) {
      this.tree[nodeIndex] = array[interval.start];

      return this.tree[nodeIndex];
    }

    this.tree[nodeIndex] =
      this._build(array, interval.leftHalfInterval, leftChildIndex(nodeIndex)) +
      this._build(array, interval.rightHalfInterval, rightChildIndex(nodeIndex));

    return this.tree[nodeIndex];
  }

  closedIntervalSum(start, end) {
    let queryInterval = new ClosedInterval(start, end);

    return this._sumFromNodes(this.wholeInterval, queryInterval, this.wholeSumIndex);
  }

  _sumFromNodes(nodeInterval, queryInterval, nodeIndex) {
    if (nodeInterval.isInside(queryInterval)) {
      return this.tree[nodeIndex];
    }

    if (nodeInterval.isOutside(queryInterval)) {
      return 0;
    }

    // query interval is partially inside node interval

    return this._sumFromNodes(nodeInterval.leftHalfInterval, queryInterval, leftChildIndex(nodeIndex)) +
      this._sumFromNodes(nodeInterval.rightHalfInterval, queryInterval, rightChildIndex(nodeIndex));
  }

  updateValue(index, newValue) {
    this._updateNodes(this.wholeInterval, index, newValue, this.wholeSumIndex);
  }

  _updateNodes(nodeInterval, index, newValue, nodeIndex) {
    if (!nodeInterval.has(index)) return this.tree[nodeIndex];

    if (nodeInterval.isSingleElement() && nodeInterval.start === index) {
      this.tree[nodeIndex] = newValue;

      return this.tree[nodeIndex];
    }

    this.tree[nodeIndex] =
      this._updateNodes(nodeInterval.leftHalfInterval, index, newValue, leftChildIndex(nodeIndex)) +
      this._updateNodes(nodeInterval.rightHalfInterval, index, newValue, rightChildIndex(nodeIndex));

    return this.tree[nodeIndex];
  }

}

module.exports = SegmentTree;
