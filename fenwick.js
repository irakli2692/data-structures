function sumParentIndex(index) {
  if (index === 0) return 0;

  return x & (x - 1);
}

class FenwickTree {
  constructor(array) {
    this.tree = new Array(array.length).fill(0);


  }

  private build(array) {
    this.tree[0] = array[0];
  }


}
