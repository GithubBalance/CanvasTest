var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UserPanel = (function (_super) {
    __extends(UserPanel, _super);
    function UserPanel() {
        _super.call(this);
        this.propertyPanel = new engine.Bitmap();
        this.propertyPanel.url = "rolepanel.png";
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
            Etexture = new engine.Bitmap();
            Etexture.width = 50;
            Etexture.height = 50;
            Etexture.x = x;
            Etexture.y = y;
            Etexture.url = texName;
            Etexture.touchEnable = true;
            Etexture.addEventListener(engine.MOUSE_EVENT.click, function () {
                User.user.addEquipmentInPackage(equipment);
                User.user.removeEquipment(equipment);
            });
            // Etexture.addEventListener(mouse.MouseEvent.ROLL_OVER, () => {
            //     this.equipmentPropertyTextContainer = PropertyDisplayFactory.createEquipmentContainer(equipment);
            //     this.equipmentPropertyTextContainer.x = 500;
            //     this.equipmentPropertyTextContainer.y = 200
            //     this.addChild(this.equipmentPropertyTextContainer);
            // }, this);
            // Etexture.addEventListener(mouse.MouseEvent.ROLL_OUT, () => {
            //     if (this.equipmentPropertyTextContainer.parent) {
            //         this.removeChild(this.equipmentPropertyTextContainer);
            //     } else {
            //         console.log("这不可能");
            //     }
            // }, this);
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
}(engine.DisplayObjectContainer));
