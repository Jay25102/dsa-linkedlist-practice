/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  _get(idx) {
    let currNode = this.head;
    let count = 0;
    while (currNode != null && count != idx) {
      currNode = currNode.next;
      count += 1;
    }
    return currNode;
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    // if the LinkedList is empty, make the newNode both head and tail
    // otherwise, add it to end of list and set as tail
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    }
    else {
      let currTail = this.tail;
      currTail.next = newNode;
      this.tail = newNode;
    }

    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    }
    else {
      newNode.next = this.head;
      this.head = newNode
    }
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.head === null) {
      throw new Error("List is empty");
    }
    if (this.length === 0) {
      return this.shift();
    }

    let secondToLastNode = this._get(length - 1);
    let lastNode = secondToLastNode.next;
    this.tail = secondToLastNode;
    secondToLastNode.next = null;
    this.length -= 1;
    return lastNode;
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.head === null) {
      throw new Error("This list is empty, cannot remove first item")
    }
    firstNode = this.head;
    this.head = this.head.next;
    this.length -= 1;

    return firstNode.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Index is greater than or equal to length");
    }

    return this._get(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Index is greater than or equal to length");
    }

    let currNode = this._get(idx);
    currNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) {
      throw new Error("Index is greater than or equal to length");
    }

    if (idx === 0) {
      return this.unshift(val);
    }
    if (idx === this.length) {
      return this.push(val);
    }

    // should return the node before idx
    let currNode = this._get(idx - 1);
    let newNode = new Node(val);

    // the next node is now the new node
    // and newNode.next should be the node that was originally on idx
    newNode.next = currNode.next;
    currNode.next = newNode;

    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    if (this.length === 0) {
      return this.shift();
    }
    if (idx === this.length - 1) {
      return this.pop();
    }

    let prevNode = this._get(idx - 1);
    let currNode = prevNode.next;
    prevNode.next = currNode.next;
    currNode.next = null;
    this.length -= 1;
    return currNode.val;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.head === null) {
      throw new Error("List is empty");
    }
    if (this.head === this.tail) {
      return this.head.val;
    }

    let total = 0.0;
    let currNode = this.head;
    while (currNode != null) {
      total += currNode.val;
      currNode = currNode.next;
    }

    return total / this.length;
  }
}

module.exports = LinkedList;