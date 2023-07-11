function Node(data, left = null, right = null) {
  return {
    data,
    left,
    right,
  };
}

function buildTree(array, start = 0, end = array.length - 1) {
  if (start > end) return null;

  const mid = parseInt((start + end) / 2);
  const root = Node(array[mid]);

  root.left = this.buildTree(array, start, mid - 1);
  root.right = this.buildTree(array, mid + 1, end);

  return root;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function Tree(arr) {
  let newArr = [...new Set(arr.sort((a, b) => a - b))];

  return {
    root: Array.isArray(arr) ? buildTree(newArr) : arr,

    insertNode(data, root = this.root) {
      if (root === null) {
        root = Node(data);
        return root;
      }

      if (data < root.data) {
        root.left = this.insertNode(data, root.left);
      } else if (data > root.data) {
        root.right = this.insertNode(data, root.right);
      }

      return root;
    },

    deleteNode(data, root = this.root) {
      // traversing down the tree
      if (data < root.data) {
        root.left = this.deleteNode(data, root.left);
        return root;
      } else if (data > root.data) {
        root.right = this.deleteNode(data, root.right);
        return root;
      }

      // case 1: if the root to be deleted is a leaf node
      if (root.left === null && root.right === null) {
        root = null;
        return root;
      }
      // case 2: if the root to be deleted has only one root
      else if (root.right === null) {
        let tmp = root;
        root = root.left;
        return root;
      } else if (root.left === null) {
        let tmp = root;
        root = root.right;
        return root;
      }

      // case 3: if the root to be deleted has two roots
      else {
        // change the root data, not the root.
        const min = (root) => {
          let nextHighest = root.data;
          let newRoot = root;

          while (newRoot.left !== null) {
            nextHighest = root.data;
            newRoot = root.left;
          }

          return nextHighest;
        };

        root.data = min(root.right);
        root.right = this.deleteNode(root.data, root.right);

        return root;
      }
    },

    find(data, root = this.root) {
      if (root === null) {
        console.log("no such data exist.");
        return root;
      } else if (data < root.data) {
        root.left = this.find(data, root.left);
        return root;
      } else if (data > root.data) {
        root.right = this.find(data, root.right);
        return root;
      } else if (data === root.data) {
        return root;
      }
    },

    // Breath-First Traversal
    levelOrder(root = this.root) {
      if (root === null) {
        return;
      }

      const queue = [];
      const datas = [];
      queue.push(root);

      while (queue.length > 0) {
        let current = queue[0];
        datas.push(current.data);

        if (current.left !== null) {
          queue.push(current.left);
        }

        if (current.right !== null) {
          queue.push(current.right);
        }

        queue.shift();
      }

      console.log(datas);
      return datas;
    },

    // Depth-First Traversal
    preorder(root = this.root) {
      // root, left, right
      if (root === null) return;

      console.log(root.data);

      this.preorder(root.left);
      this.preorder(root.right);
    },

    inorder(root = this.root) {
      // left, root, right
      if (root === null) return;

      this.inorder(root.left);
      console.log(root.data);
      this.inorder(root.right);
    },

    postorder(root = this.root) {
      // left, right, root
      if (root === null) return;

      this.postorder(root.left);
      this.postorder(root.right);
      console.log(root.data);
    },

    height(node) {
      if (node === null) return -1;
      // Height is defined as the number of edges in
      // longest path from a given node to a leaf node.

      let leftHeight = this.height(node.left);
      let rightHeight = this.height(node.right);

      return Math.max((leftHeight, rightHeight) + 1);
    },

    depth(root = this.root, node, count) {
      if (node === null) return null;

      let ct = count;

      if (node.data < root.data) {
        ct++;
        return this.depth(root.left, node, ct);
      } else if (node.data > root.data) {
        ct++;
        return this.depth(root.right, node, ct);
      }

      return ct;
    },

    isBalanced(root = this.root) {
      let left = this.height(root.left);
      let right = this.height(root.right);

      let diff = Math.abs(left - right);

      return diff < 2 ? "The Tree is Balanced" : "The Tree is not Balanced.";
    },

    rebalance(root = this.root) {
      let arr = this.levelOrder(root);
      arr.sort((a, b) => a - b);

      return (this.root = buildTree(arr));
    },
  };
}

// A driver script
function driverScript(arr) {
  // 1. create a binary search tree from an array of random numbers < 100
  const newTree = Tree(arr);

  // 2. confirm that the tree is balanced by calling isBalanced
  console.log(newTree.isBalanced())

  // 3. print out all elements in level, pre, post, and in order
  newTree.levelOrder();
  newTree.preorder();
  newTree.postorder();
  newTree.inorder();

  // 4. unbalance the tree by adding several numbers > 100
  newTree.insertNode(10000);
  newTree.insertNode(1032);
  newTree.insertNode(21312312);

  // 5. Confirm that the tree is unbalanced by calling isBalanced
  console.log(newTree.isBalanced());

  // 6. Balance the tree by calling rebalance
  newTree.rebalance()

  // 7. Confirm that the tree is balanced by calling isBalanced
  console.log(newTree.isBalanced());

  // 8. Print out all elements in level, pre, post and in order.
  newTree.levelOrder();
  newTree.preorder();
  newTree.postorder();
  newTree.inorder();
}
