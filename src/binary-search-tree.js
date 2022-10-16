const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.head = null;
  }

  root() {
    return this.head ? this.head : null;
  }

  add(data) {
    if (!this.root()) {
      this.head = new Node(data);
      return;
    }
    const step = (node) => {
      if (data < node.data) {
        if (!node.left) {
          node.left = new Node(data);
          return;
        }
        step(node.left)
      }
      if (data > node.data) {
        if (!node.right) {
          node.right = new Node(data);
          return;
        }
        step(node.right);
      }
    }
    if (data < this.root().data) {
      this.head.left ? step(this.head.left) : this.head.left = new Node(data);
    }
    if (this.root().data && data > this.root().data) {
      this.head.right ? step(this.head.right) : this.head.right = new Node(data);
    }
  }

  has(data) {
    if (!this.root().data) return false;

    const step = (node) => {
      if (data === node.data) return true;
      if (data < node.data) {
        if (!node.left) return false;
        return step(node.left);
      }
      if (data > node.data) {
        if (!node.right) return false;
        return step(node.right);
      }
    }
    return step(this.head);
  }

  find(data) {
    if (!this.root().data) return null;

    const step = (node) => {
      if (data === node.data) return node;

      if (data < node.data) {
        return node.left ? step(node.left) : null;
      }
      if (data > node.data) {
        return node.right ? step(node.right) : null;
      }
    }
    return step(this.head);
  }

  remove(data) {
    const removeChild = (parentNode, dataOfChild) => {
      if (parentNode.left && dataOfChild === parentNode.left.data) {
        if (!parentNode.left.left && !parentNode.left.right) {
          parentNode.left = null;
          return;
        }
        this.remove(parentNode.left.data);
        return;
      }
      if (parentNode.right && dataOfChild === parentNode.right.data) {
        if (!parentNode.right.left && !parentNode.right.right) {
          parentNode.right = null;
          return;
        }
        this.remove(parentNode.right.data);
        return;
      }
      return dataOfChild > parentNode.data ? removeChild(parentNode.right, dataOfChild) : removeChild(parentNode.left, dataOfChild);
    };

    let node = this.find(data);

    if (!node) return;
    if (!node.left && !node.right) {
      removeChild(this.head, data);
      return;
    }
    if (!node.left) {
      node.data = node.right.data;
      node.left = node.right.left
      node.right = node.right.right;
      return;
    }
    if (!node.right) {
      const left = node.left;
      node.data = left.data;
      node.left = left.left;
      node.right = left.right;
      return;
    }

    const getMaxFromLeft = (tree) => {
      const step = (node) => {
        return node.right ? step(node.right) : node.data;
      }
      return step(tree);
    };
    const maxFromLeft = getMaxFromLeft(node.left);

    removeChild(this.head, maxFromLeft);
    node.data = maxFromLeft;
    return;
  }

  min() {
    if (!this.root().data) return null;

    const step = (node) => {
      return node.left ? step(node.left) : node.data;
    }
    return step(this.head);
  }

  max() {
    if (!this.root().data) return null;

    const step = (node) => {
      return node.right ? step(node.right) : node.data;
    }
    return step(this.head);
  }
}

module.exports = {
  BinarySearchTree
};