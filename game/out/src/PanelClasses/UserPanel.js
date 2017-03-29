var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UserPanel = (function (_super) {
    __extends(UserPanel, _super);
    function UserPanel() {
        var _this = this;
        _super.call(this);
        this.propertyPanel = new egret.Bitmap();
        this.propertyPanel.texture = RES.getRes("rolepanel_png");
        this.propertyPanel.x = 10;
        this.propertyPanel.y = -150 + (Grid.getCurrentScene().getnumCols() * DrawTileMap.TILE_SIZE - this.propertyPanel.height) / 2;
        this.addChild(this.propertyPanel);
        this.userPropertiesTextContainer = PropertyDisplayFactory.create(User.user);
        this.userPropertiesTextContainer.x = 50;
        this.userPropertiesTextContainer.y = 640;
        this.addChild(this.userPropertiesTextContainer);
        var x = 65 + this.propertyPanel.x;
        var y = 175 + this.propertyPanel.y;
        var _loop_1 = function(equipment) {
            for (i = 0; i < equipmentConfig.length; i++) {
                if (equipment._configID == equipmentConfig[i].configID) {
                    texName = equipmentConfig[i].texture;
                    break;
                }
            }
            Etexture = new egret.Bitmap();
            Etexture.width = 50;
            Etexture.height = 50;
            Etexture.x = x;
            Etexture.y = y;
            Etexture.texture = RES.getRes(texName);
            Etexture.touchEnabled = true;
            Etexture.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                User.user.addEquipmentInPackage(equipment);
                User.user.removeEquipment(equipment);
            }, this_1);
            Etexture.addEventListener(mouse.MouseEvent.ROLL_OVER, function () {
                _this.equipmentPropertyTextContainer = PropertyDisplayFactory.createEquipmentContainer(equipment);
                _this.equipmentPropertyTextContainer.x = 500;
                _this.equipmentPropertyTextContainer.y = 200;
                _this.addChild(_this.equipmentPropertyTextContainer);
            }, this_1);
            Etexture.addEventListener(mouse.MouseEvent.ROLL_OUT, function () {
                if (_this.equipmentPropertyTextContainer.parent) {
                    _this.removeChild(_this.equipmentPropertyTextContainer);
                }
                else {
                    console.log("这不可能");
                }
            }, this_1);
            y += 60;
            if (y > 355 + this_1.propertyPanel.y) {
                x += 305;
                y = 175 + this_1.propertyPanel.y;
            }
            this_1.addChild(Etexture);
        };
        var this_1 = this;
        var i, texName, Etexture;
        for (var _i = 0, _a = User.user.equipments; _i < _a.length; _i++) {
            var equipment = _a[_i];
            _loop_1(equipment);
        }
    }
    return UserPanel;
}(egret.DisplayObjectContainer));
