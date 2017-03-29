

class PackagePanel extends engine.DisplayObjectContainer {


    private basicPanel: engine.DisplayObjectContainer;
    private packagePanel: engine.Bitmap;


    public constructor() {

        super();

        this.basicPanel = new engine.DisplayObjectContainer();

        this.packagePanel = new engine.Bitmap();
        this.packagePanel.url = "packagepanel.png";

        this.basicPanel.addChild(this.packagePanel);
        this.basicPanel.x = 20;
        this.basicPanel.y = 800;

        var x = 30;
        var y = 105;

        for (let equipment of User.user.package) {

            for (var i = 0; i < equipmentConfig.length; i++) {
                if (equipment._configID == equipmentConfig[i].configID) {
                    var texName = equipmentConfig[i].texture;
                    break;
                }
            }

            var Etexture = new engine.Bitmap();
            Etexture.url = texName;
            Etexture.width = 50;
            Etexture.height = 50;
            Etexture.x = x;
            Etexture.y = y;

            Etexture.touchEnable = true;

            Etexture.addEventListener(engine.MOUSE_EVENT.click, () => {

                User.user.addEquipment(equipment);
                User.user.removeEquipmentInPackage(equipment);
            })

            this.basicPanel.addChild(Etexture);

            x += 56;
            if (x >= 700) {
                y += 56;
            }
        }

        this.addChild(this.basicPanel);
    }
}