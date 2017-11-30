class ClosedInterval {
  constructor(start, end) {
    if (start > end) throw new Error('interval start is greater than end');

    this.start = start;
    this.end = end;
  }

  get middle() {
    return this.start + Math.floor((this.end - this.start) / 2);
  }

  isInside(interval) {
    return this.start >= interval.start && this.end <= interval.end;
  }

  isOutside(interval) {
    return this.end < interval.start || this.start > interval.end;
  }

  isSingleElement() {
    return this.start === this.end;
  }

  get leftHalfInterval() {
    if (this.leftHalf) return this.leftHalf;

    this.leftHalf = new ClosedInterval(this.start, this.middle);

    return this.leftHalf;
  }

  get rightHalfInterval() {
    if (this.rightHalf) return this.rightHalf;

    this.rightHalf = new ClosedInterval(this.middle + 1, this.end);

    return this.rightHalf;
  }

  has(element) {
    return element >= this.start && element <= this.end;
  }
}

module.exports = ClosedInterval;
