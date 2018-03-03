function sumParentIndex(index) {
  if (index === 0) return 0;

  return index & (index - 1);
}

function changeParentIndex(index) {
  return index + ( index & (-index) );
}

class FenwickTree {
  constructor(array) {
    this.tree = new Array(array.length).fill(0);

    this._build(array);
  }

  _build(array) {
    this.tree[0] = array[0];

    for (let i = 1; i < this.tree.length; i++) {
      let parentIndex = sumParentIndex(i);

      for (let j = parentIndex + 1; j <= i; j++) {
        this.tree[i] += array[j];
      }
    }
  }

  sumFromStart(endIndex) {
    let sum = this.tree[0];

    for (let i = endIndex; i > 0 ; i = sumParentIndex(i)) {
      sum += this.tree[i];
    }

    return sum;
  }

  closedIntervalSum(start, end) {
    return this.sumFromStart(end) - this.sumFromStart(start - 1);
  }

  add(index, value) {
    if(!value) return;

    if (index === 0) {
      this.tree[0] += value;
      return;
    }

    for (let i = index; i < this.tree.length; i = changeParentIndex(i)) {
      this.tree[i] += value;
    }
  }

}

module.exports = FenwickTree;
