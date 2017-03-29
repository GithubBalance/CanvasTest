

class UI extends engine.DisplayObjectContainer {


    private avater: engine.Bitmap;
    private packageButton: engine.Bitmap;

    private userPanel: UserPanel;
    private packagePanel;


    public constructor() {

        super();

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

        this.avater.addEventListener(engine.MOUSE_EVENT.click, () => {
            this.onAvaterClick();
        })

        this.packageButton.addEventListener(engine.MOUSE_EVENT.click, () => {
            this.onPackageClick();
        })
    }

    private onAvaterClick() {

        if (!this.userPanel) {
            this.userPanel = new UserPanel();
        }

        if (this.userPanel.parent) {

            this.removeChild(this.userPanel);
            User.user.locked--;

        } else {
            this.addChild(this.userPanel);
            User.user.locked++;
        }
    }

    private onPackageClick() {

        if (!this.packagePanel) {
            this.packagePanel = new PackagePanel();
        }

        if (this.packagePanel.parent) {

            this.removeChild(this.packagePanel);
            User.user.locked--;

        } else {
            this.addChild(this.packagePanel);
            User.user.locked++;
        }
    }

    public refresh() {


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
    }

    public gameOverReaction() {

        var overImage = new engine.Bitmap();
        overImage.url = "gameover.png";

        overImage.touchEnable = true;
        overImage.addEventListener(engine.MOUSE_EVENT.click,()=>{
            
        })

        this.addChild(overImage);
    }
}