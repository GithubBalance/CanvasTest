var Grid = (function () {
    function Grid() {
        this.aStarMethod = new AStar();
        if (!Grid.scene) {
            this._nodes = new Array();
            for (var i = 0; i < config.length; i++) {
                var tile = config[i];
                this._nodes[i] = new MyNode(tile.x, tile.y);
                this._nodes[i].walkable = tile.walkable;
            }
        }
        Grid.scene = this;
        return Grid.scene;
    }
    Grid.replaceScene = function (scene) {
        Grid.scene = scene;
    };
    Grid.getCurrentScene = function () {
        return Grid.scene;
    };
    Grid.prototype.moveTo = function (x, y, callback) {
        var _this = this;
        Grid.getCurrentScene().setStartNode(Math.floor(User.user.animationContainer.x / DrawTileMap.TILE_SIZE), Math.floor(User.user.animationContainer.y / DrawTileMap.TILE_SIZE));
        Grid.getCurrentScene().setEndNode(x, y);
        Grid.getCurrentScene().aStarMethod.findPath(Grid.getCurrentScene());
        var path = Grid.getCurrentScene().aStarMethod._path;
        path.shift();
        var currentStep = path.shift(); //当前步
        var newX = currentStep.x * DrawTileMap.TILE_SIZE - User.user.animationContainer.x;
        var newY = currentStep.y * DrawTileMap.TILE_SIZE - User.user.animationContainer.y; //当前步坐标
        if (newX < 0) {
            User.user.stateMachine.towardLeft = true;
        }
        if (newX > 0) {
            User.user.stateMachine.towardLeft = false;
        }
        User.user.stateMachine.runState();
        this.intervalNumber = setInterval(function () {
            if (User.user.animationContainer.x != currentStep.x * DrawTileMap.TILE_SIZE ||
                User.user.animationContainer.y != currentStep.y * DrawTileMap.TILE_SIZE) {
                User.user.animationContainer.x += newX * Machine.Speed;
                User.user.animationContainer.y += newY * Machine.Speed;
                if (User.user.animationContainer.x == currentStep.x * DrawTileMap.TILE_SIZE &&
                    User.user.animationContainer.y == currentStep.y * DrawTileMap.TILE_SIZE &&
                    path.length != 0) {
                    currentStep = path.shift();
                    newX = currentStep.x * DrawTileMap.TILE_SIZE - User.user.animationContainer.x;
                    newY = currentStep.y * DrawTileMap.TILE_SIZE - User.user.animationContainer.y;
                    if (newX < 0) {
                        User.user.stateMachine.towardLeft = true;
                    }
                    if (newX > 0) {
                        User.user.stateMachine.towardLeft = false;
                    }
                    User.user.stateMachine.runState();
                }
            }
            else {
                clearInterval(_this.intervalNumber);
                User.user.stateMachine.Idel();
                callback();
            }
        }, 50);
        // this.timer = new engine.Timer(50, 0);
        // this.timer.addEventListener(engine.TimerEvent.TIMER, () => {
        //     if (User.user.animationContainer.x != currentStep.x * DrawTileMap.TILE_SIZE ||
        //         User.user.animationContainer.y != currentStep.y * DrawTileMap.TILE_SIZE) {
        //         User.user.animationContainer.x += newX * Machine.Speed;
        //         User.user.animationContainer.y += newY * Machine.Speed;
        //         if (User.user.animationContainer.x == currentStep.x * DrawTileMap.TILE_SIZE &&
        //             User.user.animationContainer.y == currentStep.y * DrawTileMap.TILE_SIZE &&
        //             path.length != 0) {
        //             currentStep = path.shift();
        //             newX = currentStep.x * DrawTileMap.TILE_SIZE - User.user.animationContainer.x;
        //             newY = currentStep.y * DrawTileMap.TILE_SIZE - User.user.animationContainer.y;
        //             if (newX < 0) {
        //                 User.user.stateMachine.towardLeft = true;
        //             }
        //             if (newX > 0) {
        //                 User.user.stateMachine.towardLeft = false;
        //             }
        //             User.user.stateMachine.runState();
        //         }
        //     } else {
        //         this.timer.stop();
        //         User.user.stateMachine.Idel();
        //         callback();
        //     }
        // }, this);
        // this.timer.start();
    };
    Grid.prototype.stopMove = function (callback) {
        // if (this.timer) {
        //     this.timer.stop();
        clearInterval(this.intervalNumber);
        User.user.stateMachine.Idel();
        // }
        callback();
    };
    Grid.prototype.setPlayerPositionOnMap = function (nodeX, nodeY) {
        if (User.user) {
            if (config[nodeX * this.getnumRows() + nodeY].walkable) {
                User.user.animationContainer.x = nodeX * DrawTileMap.TILE_SIZE;
                User.user.animationContainer.y = nodeY * DrawTileMap.TILE_SIZE;
            }
        }
    };
    Grid.prototype.getNode = function (x, y) {
        return this._nodes[x * Grid._numCols + y];
    };
    Grid.prototype.setEndNode = function (x, y) {
        this._endNode = this._nodes[x * Grid._numCols + y];
    };
    Grid.prototype.setStartNode = function (x, y) {
        this._startNode = this._nodes[x * Grid._numCols + y];
    };
    Grid.prototype.setWalkable = function (x, y, value) {
        this._nodes[x * Grid._numCols + y].walkable = value;
    };
    Grid.prototype.getendNode = function () {
        return this._endNode;
    };
    Grid.prototype.getnumCols = function () {
        return Grid._numCols;
    };
    Grid.prototype.getnumRows = function () {
        return Grid._numRows;
    };
    Grid.prototype.getstartNode = function () {
        return this._startNode;
    };
    Grid._numCols = 12; //定义行
    Grid._numRows = 12; //定义列
    return Grid;
}());
