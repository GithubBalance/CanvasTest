var AStar = (function () {
    function AStar() {
        this._heuristic = this.diagonal;
        this._straightCost = 1.0;
        this._diagCost = Math.sqrt(2);
    }
    AStar.prototype.findPath = function (grid) {
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
    };
    AStar.prototype.search = function () {
        var node = this._startNode;
        while (node != this._endNode) {
            var startX = Math.max(0, node.x - 1);
            var endX = Math.min(this._grid.getnumCols() - 1, node.x + 1);
            var startY = Math.max(0, node.y - 1);
            var endY = Math.min(this._grid.getnumRows() - 1, node.y + 1);
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    var test = this._grid.getNode(i, j);
                    if (test == node || !test.walkable) {
                        continue;
                    }
                    var cost = this._straightCost;
                    if (!((node.x == test.x) || (node.y == test.y))) {
                        cost = this._diagCost;
                    }
                    var g = node.g + cost * test.costMultiplier;
                    var h = this._heuristic(test);
                    var f = g + h;
                    if (this.isOpen(test) || this.isClosed(test)) {
                        if (test.f > f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                        }
                    }
                    else {
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
                return false;
            }
            this._open.sort(function (a, b) {
                return a.f - b.f;
            });
            this._open.map(function (a) {
                //console.log(a.f);
            });
            node = this._open.shift();
        }
        this.buildPath();
        return true;
    };
    AStar.prototype.buildPath = function () {
        var node = this._endNode;
        this._path.push(node);
        while (node != this._startNode) {
            console.log(node.x + ' ' + node.y);
            node = node.parent;
            this._path.unshift(node);
        }
    };
    AStar.prototype.isOpen = function (test) {
        return this._open.indexOf(test) >= 0;
    };
    AStar.prototype.isClosed = function (test) {
        return this._closed.indexOf(test) >= 0;
    };
    AStar.prototype.diagonal = function (node) {
        var dx = Math.abs(node.x - this._endNode.x);
        var dy = Math.abs(node.y - this._endNode.y);
        var diag = Math.min(dx, dy);
        var straight = dx + dy;
        return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
    };
    AStar.prototype.sortdownbyf = function () {
        var min = 0;
        for (var m = 0; m < this._open.length; m++) {
            min = m;
            for (var n = m; n < this._open.length; n++) {
                if (this._open[n].f <= this._open[m].f) {
                    min = n;
                }
            }
            var temp = this._open[min];
            this._open[min] = this._open[m];
            this._open[m] = temp;
        }
    };
    return AStar;
}());
