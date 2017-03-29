

class HP extends engine.DisplayObjectContainer {

	private healthBar: engine.Shape;

	private maxHP: number;
	private currentHP: number;

	public static healthBarLength: number = 180;
	public static healthBarHeight: number = 20;

	public constructor(maxHP: number, currentHP: number) {

		super();

		this.maxHP = maxHP;
		this.currentHP = currentHP;

		this.healthBar = new engine.Shape();
		this.healthBar.color = "#00ff00"
		//this.healthBar.graphics.beginFill(0x00ff00, 1);

		var trueLength = (this.currentHP / this.maxHP) * HP.healthBarLength

		this.healthBar.width = trueLength;
		this.healthBar.height = HP.healthBarHeight;
		//this.healthBar.graphics.drawRect(0, 0, trueLength, HP.healthBarHeight);
		//this.healthBar.graphics.endFill();
		this.addChild(this.healthBar)
	}

	up(heal: number) {

		this.currentHP += heal;

		if (this.currentHP > this.maxHP) {
			this.currentHP = this.maxHP;
		}

		this.repaint();
	}

	upTotal(increase: number) {
		this.maxHP += increase;
	}


	down(damage: number) {

		this.currentHP -= damage;

		if (this.currentHP < 0) {
			this.currentHP = 0
		}
		this.repaint();

	}

	downTotal(decrease: number) {
		this.maxHP -= decrease;
		if (this.maxHP <= 0) {
			this.maxHP += decrease;
			console.log("eerror HP!");
		}
	}

	get _currentHP(): number {
		return this.currentHP
	}

	private repaint() {

		if (this.healthBar.parent) {
			this.removeChild(this.healthBar);
			this.healthBar = new engine.Shape();
			this.healthBar.color = "#00ff00"
			//this.healthBar.graphics.beginFill(0x00ff00, 1);

			var trueLength = (this.currentHP / this.maxHP) * HP.healthBarLength

			this.healthBar.width = trueLength;
			this.healthBar.height = HP.healthBarHeight;
			this.addChild(this.healthBar)
		} else {
			console.log("no healthbar");
		}
	}
}