var InfinityMax = 1000000009;
class SegmentTreeSum {
    constructor(arr) {
        this.tree = new Array(4 * arr.length);
        this.build(arr, 0, 0, arr.length - 1);
    }

    build(arr, node, start, end) {
        if (start === end) {
            this.tree[node] = arr[start];
            var range = start + "-" + end;
            console.log(range);
            return;
        } else {
            const mid = Math.floor((start + end) / 2);
            this.build(arr, 2 * node + 1, start, mid);
            this.build(arr, 2 * node + 2, mid + 1, end);
            this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
        }
    }
    querySum(left, right) {
        console.log(this.tree);
        console.log("hello");
        return this._query(left, right, 0, 0, Math.floor(this.tree.length / 4) - 1);

    }
    _query(left, right, node, start, end) {
        if (right < start || left > end) {
            return 0;
        }
        if (left <= start && right >= end) {
            
            return this.tree[node];
        }
        const mid = Math.floor((start + end) / 2);
        var ans =
            this._query(left, right, 2 * node + 1, start, mid) +
            this._query(left, right, 2 * node + 2, mid + 1, end);
        return ans;
    }
}
var intervals = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
var st = new SegmentTreeSum(intervals);
console.log(st.querySum(1, 4));