class AStar {

    private _open: Array<MyNode>;
    private _closed: Array<MyNode>;
    private _grid: Grid;
    private _endNode: MyNode;
    private _startNode: MyNode;
    public _path: Array<MyNode>;
    private _heuristic = this.diagonal;
    private _straightCost: number = 1.0;
    private _diagCost: number = Math.sqrt(2);

    public constructor() {

    }

    public findPath(grid: Grid): boolean {

        this._grid = grid;
        this._open = new Array();
        this._closed = new Array();
        this._path = new Array();
        this._startNode = this._grid.getstartNode();
        this._endNode = this._grid.getendNode();
        this._startNode.g = 0;
        this._startNode.h = this._heuristic(this._startNode);
        this._startNode.f = this._startNode.g + this._startNode.h;
        return this.search();
    }

    public search(): boolean {

        var node: MyNode = this._startNode;
        while (node != this._endNode) {
            var startX: number = Math.max(0, node.x - 1);
            var endX: number = Math.min(this._grid.getnumCols() - 1, node.x + 1);
            var startY: number = Math.max(0, node.y - 1);
            var endY: number = Math.min(this._grid.getnumRows() - 1, node.y + 1);
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    var test = this._grid.getNode(i, j);
                    if (test == node || !test.walkable) {
                        continue;
                    }
                    var cost: number = this._straightCost;
                    if (!((node.x == test.x) || (node.y == test.y))) {
                        cost = this._diagCost;
                    }
                    var g: number = node.g + cost * test.costMultiplier;
                    var h: number = this._heuristic(test);
                    var f: number = g + h;
                    if (this.isOpen(test) || this.isClosed(test)) {
                        if (test.f > f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                        }
                    } else {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = node;
                        this._open.push(test);
                    }
                }
            }

            for (var o = 0; o < this._open.length; o++) {

            }

            this._closed.push(node);
            if (this._open.length == 0) {
                console.log("no path found");
                return false
            }

            this._open.sort(function (a, b) {
                return a.f - b.f;
            });
            this._open.map(function (a) {
                //console.log(a.f);
            });
            node = this._open.shift() as MyNode;
        }
        this.buildPath();
        return true;
    }

    private buildPath(): void {

        var node: MyNode = this._endNode;
        this._path.push(node);
        while (node != this._startNode) {

            console.log(node.x + ' ' + node.y);
            node = node.parent;
            this._path.unshift(node);
        }
    }

    private isOpen(test: MyNode): boolean {

        return this._open.indexOf(test) >= 0;
    }

    private isClosed(test: MyNode): boolean {

        return this._closed.indexOf(test) >= 0;
    }

    private diagonal(node: MyNode): number {

        var dx: number = Math.abs(node.x - this._endNode.x);
        var dy: number = Math.abs(node.y - this._endNode.y);
        var diag: number = Math.min(dx, dy);
        var straight: number = dx + dy;
        return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
    }

    private sortdownbyf() {       //按照f升序排列open组

        var min: number = 0;
        for (var m = 0; m < this._open.length; m++) {
            min = m;
            for (var n = m; n < this._open.length; n++) {
                if (this._open[n].f <= this._open[m].f) {
                    min = n;
                }
            }
            var temp: MyNode = this._open[min];
            this._open[min] = this._open[m];
            this._open[m] = temp;
        }
    }
}