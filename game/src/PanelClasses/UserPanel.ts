

class UserPanel extends engine.DisplayObjectContainer {

    private propertyPanel: engine.Bitmap;

    private userPropertiesTextContainer: engine.DisplayObjectContainer;

    private equipmentPropertyTextContainer: engine.DisplayObjectContainer;

    public constructor() {

        super();


        this.propertyPanel = new engine.Bitmap();
        this.propertyPanel.url = "rolepanel.png";
        this.propertyPanel.x = 10;
        this.propertyPanel.y = -150 + (Grid.getCurrentScene().getnumCols() * DrawTileMap.TILE_SIZE - this.propertyPanel.height) / 2
        this.addChild(this.propertyPanel);

        this.userPropertiesTextContainer = PropertyDisplayFactory.create(User.user);
        this.userPropertiesTextContainer.x = 50;
        this.userPropertiesTextContainer.y = 640
        this.addChild(this.userPropertiesTextContainer);


        var x = 65 + this.propertyPanel.x;
        var y = 175 + this.propertyPanel.y;

        for (let equipment of User.user.equipments) {

            for (var i = 0; i < equipmentConfig.length; i++) {

                if (equipment._configID == equipmentConfig[i].configID) {

                    var texName = equipmentConfig[i].texture;
                    break;
                }
            }

            var Etexture = new engine.Bitmap();
            Etexture.width = 50;
            Etexture.height = 50;
            Etexture.x = x;
            Etexture.y = y;

            Etexture.url = texName;

            Etexture.touchEnable = true;

            Etexture.addEventListener(engine.MOUSE_EVENT.click, () => {

                User.user.addEquipmentInPackage(equipment);
                User.user.removeEquipment(equipment);
            })

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

            y += 60
            if (y > 355 + this.propertyPanel.y) {
                x += 305
                y = 175 + this.propertyPanel.y;
            }

            this.addChild(Etexture);
        }
    }
}