var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DrawTileMap = (function (_super) {
    __extends(DrawTileMap, _super);
    function DrawTileMap() {
        _super.call(this);
        this.pathCauculation = new AStar(); //采用的寻路算法
        this.backGround = new engine.Bitmap();
        this.init();
    }
    DrawTileMap.prototype.init = function () {
        var _this = this;
        this.backGround.url = "background1.png";
        this.backGround.touchEnable = true;
        this.backGround.addEventListener(engine.MOUSE_EVENT.click, function (e) {
            var mapX = Math.floor(e.clientX / DrawTileMap.TILE_SIZE);
            var mapY = Math.floor(e.clientY / DrawTileMap.TILE_SIZE);
            if (config[Grid.getCurrentScene().getnumRows() * mapX + mapY].walkable) {
                _this.onNodeClick(Math.floor(e.clientX / DrawTileMap.TILE_SIZE), Math.floor(e.clientY / DrawTileMap.TILE_SIZE));
            }
        });
        this.addChild(this.backGround);
    };
    DrawTileMap.prototype.onNodeClick = function (x, y) {
        User.user.commandList.cancel();
        if ((Math.floor(User.user.animationContainer.x / DrawTileMap.TILE_SIZE) != x ||
            Math.floor(User.user.animationContainer.y / DrawTileMap.TILE_SIZE) != y) &&
            !User.user.locked) {
            User.user.commandList.addCommand(new WalkCommand(x, y));
            User.user.commandList.execute();
        }
    };
    DrawTileMap.TILE_SIZE = 100; //每格地图实际大小
    return DrawTileMap;
}(engine.DisplayObjectContainer));
