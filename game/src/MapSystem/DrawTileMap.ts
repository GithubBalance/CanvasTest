

class DrawTileMap extends engine.DisplayObjectContainer {

	public static TILE_SIZE = 100;             //每格地图实际大小

	public pathCauculation = new AStar();      //采用的寻路算法

	private backGround = new engine.Bitmap();

	public constructor() {

		super();
		this.init();
	}

	init() {


		this.backGround.url = "background1.png";

		this.backGround.touchEnable = true;
		this.backGround.addEventListener(engine.MOUSE_EVENT.click, (e) => {

			var mapX = Math.floor(e.clientX / DrawTileMap.TILE_SIZE);
			var mapY = Math.floor(e.clientY / DrawTileMap.TILE_SIZE);

			if (config[Grid.getCurrentScene().getnumRows() * mapX + mapY].walkable) {

				this.onNodeClick(Math.floor(e.clientX / DrawTileMap.TILE_SIZE), Math.floor(e.clientY / DrawTileMap.TILE_SIZE));
			}
		});
		this.addChild(this.backGround)
	}

	private onNodeClick(x: number, y: number) {

		User.user.commandList.cancel();

		if ((Math.floor(User.user.animationContainer.x / DrawTileMap.TILE_SIZE) != x ||
			Math.floor(User.user.animationContainer.y / DrawTileMap.TILE_SIZE) != y) &&
			!User.user.locked) {

			User.user.commandList.addCommand(new WalkCommand(x, y));
			User.user.commandList.execute();
		}
	}
}