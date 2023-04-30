//Node Object Constructor
var intervals = new Array();
var x = 0;
var InfinityMax = 1000000009;
var InfinityMin = -1000000009;
var displayIntervals = document.getElementById('showIntervals');
var st;
var xPos = 100;
var yPos = 0;
var change = 50;
// code of array to segment tree construction
class SegmentTreeMin {
  constructor(arr) {
    var size = Math.pow(2, Math.ceil(Math.log2(intervals.length)) + 1);
    this.tree = new Array(size);
    for (let i = 0; i < size; i++) {
      this.tree[i] = -1;
    }
    this.build(arr, 0, 0, arr.length - 1, 0, 0, 100);
    // console.log(this.tree);
  }
  build(arr, node, start, end, xPos, yPos, change) {
    var range = "[" + start + "-" + end + "]";
    // console.log(node);
    if (start === end) {

      this.tree[node] = arr[start];
      // console.log(this.tree[node]);
      // var range = start + "-" + end;
      // console.log(range);
      addNode("node" + node, this.tree[node].toString() + range, xPos, yPos);
    } else {
      const mid = Math.floor((start + end) / 2);
      // console.log(node);
      this.build(arr, 2 * node + 1, start, mid, xPos - change, yPos + 30, change / 2);
      this.build(arr, 2 * node + 2, mid + 1, end, xPos + change, yPos + 30, change / 2);
      this.tree[node] = Math.min(this.tree[2 * node + 1], this.tree[2 * node + 2]);
      // console.log(node);
      addNode("node" + node, this.tree[node].toString() + range, xPos, yPos);
      if (this.tree[2 * node + 1] != -1) {
        addEdge("node" + node, "node" + (2 * node + 1));
      }
      if (this.tree[2 * node + 2] != -1) {
        addEdge("node" + node, "node" + (2 * node + 2));
      }
    }
  }
  queryMin(left, right) {
    return this._query(left, right, 0, 0, intervals.length - 1);
  }
  _query(left, right, node, start, end) {
    if (right < start || left > end) {
      return Infinity;
    }
    if (left <= start && right >= end) {
      changeColor('node' + node);
      return this.tree[node];
    }
    const mid = Math.floor((start + end) / 2);
    return Math.min(
      this._query(left, right, 2 * node + 1, start, mid),
      this._query(left, right, 2 * node + 2, mid + 1, end)
    );
  }
}
class SegmentTreeMax {
  constructor(arr) {
    var size = Math.pow(2, Math.ceil(Math.log2(intervals.length)) + 1);
    this.tree = new Array(size);
    for (let i = 0; i < size; i++) {
      this.tree[i] = -1;
    }
    this.build(arr, 0, 0, arr.length - 1, 0, 0, 100);
    // console.log(this.tree);
  }
  build(arr, node, start, end, xPos, yPos, change) {
    var range = "[" + start + "-" + end + "]";
    // console.log(node);
    if (start === end) {
      this.tree[node] = arr[start];
      // console.log(this.tree[node]);
      addNode("node" + node, this.tree[node].toString() + range, xPos, yPos);
    } else {
      const mid = Math.floor((start + end) / 2);
      // console.log(node);
      this.build(arr, 2 * node + 1, start, mid, xPos - change, yPos + 30, change / 2);
      this.build(arr, 2 * node + 2, mid + 1, end, xPos + change, yPos + 30, change / 2);
      this.tree[node] = Math.max(this.tree[2 * node + 1], this.tree[2 * node + 2]);
      // console.log(node);
      addNode("node" + node, this.tree[node].toString() + range, xPos, yPos);
      if (this.tree[2 * node + 1] != -1) {
        addEdge("node" + node, "node" + (2 * node + 1));
      }
      if (this.tree[2 * node + 2] != -1) {
        addEdge("node" + node, "node" + (2 * node + 2));
      }
    }
  }
  queryMax(left, right) {
    return this._query(left, right, 0, 0, intervals.length - 1);
  }
  //left 0 right 1  //
  _query(left, right, node, start, end) {
    if (right < start || left > end) {
      return InfinityMin;
    }
    if (left <= start && right >= end) {
      changeColor('node' + node);
      // console.log('node' + (Math.ceil(node / 2)));
      return this.tree[node];
    }
    const mid = Math.floor((start + end) / 2);
    return Math.max(
      this._query(left, right, 2 * node + 1, start, mid),
      this._query(left, right, 2 * node + 2, mid + 1, end)
    );
  }
}
class SegmentTreeSum {
  constructor(arr) {
    var size = Math.pow(2, Math.ceil(Math.log2(intervals.length)) + 1);
    this.tree = new Array(size);
    for (let i = 0; i < size; i++) {
      this.tree[i] = -1;
    }
    this.build(arr, 0, 0, arr.length - 1, 0, 0, 100);
    // console.log(this.tree);
  }
  build(arr, node, start, end, xPos, yPos, change) {
    var range = "[" + start + "-" + end + "]";
    // console.log(node);
    if (start === end) {

      this.tree[node] = arr[start];
      // console.log(this.tree[node]);
      addNode("node" + node, this.tree[node].toString() + range, xPos, yPos);
    } else {
      const mid = Math.floor((start + end) / 2);
      // console.log(node);
      this.build(arr, 2 * node + 1, start, mid, xPos - change, yPos + 30, change / 2);
      this.build(arr, 2 * node + 2, mid + 1, end, xPos + change, yPos + 30, change / 2);
      this.tree[node] = (this.tree[2 * node + 1] + this.tree[2 * node + 2]);
      // console.log(node);
      addNode("node" + node, this.tree[node].toString() + range, xPos, yPos);
      if (this.tree[2 * node + 1] != -1) {
        addEdge("node" + node, "node" + (2 * node + 1));
      }
      if (this.tree[2 * node + 2] != -1) {
        addEdge("node" + node, "node" + (2 * node + 2));
      }
    }
  }
  querySum(left, right) {
    return this._query(left, right, 0, 0, intervals.length - 1);
  }
  _query(left, right, node, start, end) {
    console.log(start, end, node);
    if (right < start || left > end) {
      return 0;
    }
    if (left <= start && right >= end) {
      changeColor('node' + node);
      // console.log(this.tree[node]);
      return this.tree[node];
    }
    const mid = Math.floor((start + end) / 2);
    var ans = this._query(left, right, 2 * node + 1, start, mid) + this._query(left, right, 2 * node + 2, mid + 1, end);
    return ans;
  }
}
function generateSet() {
  // var x = document.getElementById("selectQuery").selectedIndex;
  if (document.getElementById('rbMax').checked) {
    st = new SegmentTreeMax(intervals);
    console.log("max");
    // console.log(st.queryMax(1, 4));
  } else if (document.getElementById('rbMin').checked) {

    st = new SegmentTreeMin(intervals);
    console.log("min");
    // console.log(st.queryMin(0, 4));
  }
  else if (document.getElementById('rbSum').checked) {
    st = new SegmentTreeSum(intervals);
    console.log("sum");
  }
  console.log(intervals);
}
function addToArray() {
  var st = parseInt(document.getElementById('startingInterval').value);
  if (!intervals.includes(st)) {
    // intervals.sort();
    intervals[x] = st;
    // document.getElementById("startingInterval").value;
    for (var i = 0; i < intervals.length; i++) {
      for (var j = 0; j < (intervals.length - i - 1); j++) {
        if (intervals[j] > intervals[j + 1]) {

          var temp = intervals[j];
          intervals[j] = intervals[j + 1];
          intervals[j + 1] = temp;
        }
      }
    }
    x++;
  }
  var ed = parseInt(document.getElementById('endingInterval').value);
  if (!intervals.includes(ed)) {
    // intervals.sort();

    intervals[x] = ed;
    // document.getElementById("endingInterval").value;

    for (var i = 0; i < intervals.length; i++) {
      for (var j = 0; j < (intervals.length - i - 1); j++) {
        if (intervals[j] > intervals[j + 1]) {

          var temp = intervals[j];
          intervals[j] = intervals[j + 1];
          intervals[j + 1] = temp;
        }
      }
    }
    // intervals.sort();
    x++;
  }
  // intervals.sort();
  for (var i = 0; i < intervals.length; i++) {
    for (var j = 0; j < (intervals.length - i - 1); j++) {
      if (intervals[j] > intervals[j + 1]) {

        var temp = intervals[j];
        intervals[j] = intervals[j + 1];
        intervals[j + 1] = temp;
      }
    }
  }
  let text = intervals;
  document.getElementById("show").textContent = '[' + text + ']';

  // console.log(typeof intervals[0]);
  console.log(intervals);
}

//draw code for tree
const container = document.getElementById("tree-container");
const s = new sigma({
  renderer: {
    container: container,
    type: "canvas"
  },
  settings: {
    minNodeSize: 10,
    maxNodeSize: 20,
    minEdgeSize: 2,
    maxEdgeSize: 2,
    edgeColor: "#000000",
    borderColor: "#000000",
    borderWidth: 2,
    borderStyle: "solid",
    defaultNodeColor: "#007958",
    labelThreshold: 0,
    rendererEdgeLabels: true
  }
});
s.cameras[0].goTo({ x: 50, y: 0, angle: 0, ratio: 2 });
s.refresh();

function addNode(data, display, pos_x, pos_y) {
  console.log(s.graph.addNode({
    id: data,
    label: display,
    x: pos_x,
    y: pos_y,
    size: 10
  }));

  s.refresh();
}

function addEdge(from, to) {
  s.graph.addEdge({
    id: `${from}-${to}`,
    source: from,
    target: to
  });

  s.refresh();
}
function changeColor(index) {
  s.graph.nodes(index).color = '#00008B';
  s.refresh();
}
function find() {
  var sq = parseInt(document.getElementById('startingIntervalQuery').value);
  var eq = parseInt(document.getElementById('endingIntervalQuery').value);
  if (document.getElementById('rbMax').checked) {
    document.getElementById("ans").value = "Answer is:- " + st.queryMax(sq, eq);
  } else if (document.getElementById('rbMin').checked) {
    document.getElementById("ans").value = "Answer is:- " + st.queryMin(sq, eq);
  }
  else {
    document.getElementById("ans").value = "Answer is:- " + st.querySum(sq, eq);
  }
}
