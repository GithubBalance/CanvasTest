

class Grid {

    private _startNode: MyNode;
    private _endNode: MyNode;
    private _nodes: Array<MyNode>;

    private intervalNumber: number;

    private static _numCols: number = 12;   //定义行
    private static _numRows: number = 12;   //定义列

    private static scene: Grid;             //单例模式

    public aStarMethod = new AStar();

    public static replaceScene(scene: Grid) {
        Grid.scene = scene;
    }

    public static getCurrentScene(): Grid {
        return Grid.scene;
    }

    public moveTo(x: number, y: number, callback: Function) {

        Grid.getCurrentScene().setStartNode(Math.floor(User.user.animationContainer.x / DrawTileMap.TILE_SIZE), Math.floor(User.user.animationContainer.y / DrawTileMap.TILE_SIZE));
        Grid.getCurrentScene().setEndNode(x, y);
        Grid.getCurrentScene().aStarMethod.findPath(Grid.getCurrentScene());


        var path = Grid.getCurrentScene().aStarMethod._path;
        path.shift();
        var currentStep = path.shift();    //当前步

        var newX = currentStep.x * DrawTileMap.TILE_SIZE - User.user.animationContainer.x;
        var newY = currentStep.y * DrawTileMap.TILE_SIZE - User.user.animationContainer.y;     //当前步坐标

        if (newX < 0) {
            User.user.stateMachine.towardLeft = true;
        }
        if (newX > 0) {
            User.user.stateMachine.towardLeft = false;
        }
        User.user.stateMachine.runState();

        this.intervalNumber = setInterval(() => {
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
            } else {
                clearInterval(this.intervalNumber);
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
    }

    public stopMove(callback: Function) {

        // if (this.timer) {
        //     this.timer.stop();
        clearInterval(this.intervalNumber);
        User.user.stateMachine.Idel();
        // }
        callback();
    }

    public setPlayerPositionOnMap(nodeX: number, nodeY: number) {

        if (User.user) {
            if (config[nodeX * this.getnumRows() + nodeY].walkable) {
                User.user.animationContainer.x = nodeX * DrawTileMap.TILE_SIZE;
                User.user.animationContainer.y = nodeY * DrawTileMap.TILE_SIZE;
            }
        }
    }

    public constructor() {

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

    public getNode(x: number, y: number): MyNode {

        return this._nodes[x * Grid._numCols + y] as MyNode;
    }

    public setEndNode(x: number, y: number): void {

        this._endNode = this._nodes[x * Grid._numCols + y] as MyNode;
    }

    public setStartNode(x: number, y: number): void {

        this._startNode = this._nodes[x * Grid._numCols + y] as MyNode;
    }

    public setWalkable(x: number, y: number, value: Boolean): void {

        this._nodes[x * Grid._numCols + y].walkable = value;
    }

    public getendNode(): MyNode {

        return this._endNode;
    }

    public getnumCols(): number {

        return Grid._numCols;
    }

    public getnumRows(): number {

        return Grid._numRows;
    }

    public getstartNode(): MyNode {

        return this._startNode;
    }
}





