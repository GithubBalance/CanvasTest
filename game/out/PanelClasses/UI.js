var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI = (function (_super) {
    __extends(UI, _super);
    function UI() {
        var _this = this;
        _super.call(this);
        var stageH = Grid.getCurrentScene().getnumRows() * DrawTileMap.TILE_SIZE;
        var stageW = Grid.getCurrentScene().getnumCols() * DrawTileMap.TILE_SIZE;
        this.avater = new engine.Bitmap();
        this.avater.url = "avater.png";
        this.addChild(this.avater);
        this.packageButton = new engine.Bitmap();
        this.packageButton.url = "packagebutton.png";
        this.addChild(this.packageButton);
        this.packageButton.x = this.avater.width + 10;
        this.avater.touchEnable = true;
        this.packageButton.touchEnable = true;
        this.avater.addEventListener(engine.MOUSE_EVENT.click, function () {
            _this.onAvaterClick();
        });
        this.packageButton.addEventListener(engine.MOUSE_EVENT.click, function () {
            _this.onPackageClick();
        });
    }
    UI.prototype.onAvaterClick = function () {
        if (!this.userPanel) {
            this.userPanel = new UserPanel();
        }
        if (this.userPanel.parent) {
            this.removeChild(this.userPanel);
            User.user.locked--;
        }
        else {
            this.addChild(this.userPanel);
            User.user.locked++;
        }
    };
    UI.prototype.onPackageClick = function () {
        if (!this.packagePanel) {
            this.packagePanel = new PackagePanel();
        }
        if (this.packagePanel.parent) {
            this.removeChild(this.packagePanel);
            User.user.locked--;
        }
        else {
            this.addChild(this.packagePanel);
            User.user.locked++;
        }
    };
    UI.prototype.refresh = function () {
        if (!this.packagePanel) {
            this.packagePanel = new PackagePanel();
        }
        if (!this.userPanel) {
            this.userPanel = new UserPanel();
        }
        if (this.userPanel.parent) {
            this.removeChild(this.userPanel);
            User.user.locked--;
        }
        if (this.packagePanel.parent) {
            this.removeChild(this.packagePanel);
            User.user.locked--;
        }
        this.packagePanel = new PackagePanel();
        this.userPanel = new UserPanel();
        this.addChild(this.userPanel);
        this.addChild(this.packagePanel);
        User.user.locked += 2;
    };
    UI.prototype.gameOverReaction = function () {
        var overImage = new engine.Bitmap();
        overImage.url = "gameover.png";
        overImage.touchEnable = true;
        overImage.addEventListener(engine.MOUSE_EVENT.click, function () {
        });
        this.addChild(overImage);
    };
    return UI;
}(engine.DisplayObjectContainer));
