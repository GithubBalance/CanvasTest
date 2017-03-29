var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HP = (function (_super) {
    __extends(HP, _super);
    function HP(maxHP, currentHP) {
        _super.call(this);
        this.maxHP = maxHP;
        this.currentHP = currentHP;
        this.healthBar = new egret.Shape();
        this.healthBar.graphics.beginFill(0x00ff00, 1);
        var trueLength = (this.currentHP / this.maxHP) * HP.healthBarLength;
        this.healthBar.graphics.drawRect(0, 0, trueLength, HP.healthBarHeight);
        this.healthBar.graphics.endFill();
        this.addChild(this.healthBar);
    }
    HP.prototype.up = function (heal) {
        this.currentHP += heal;
        if (this.currentHP > this.maxHP) {
            this.currentHP = this.maxHP;
        }
        this.repaint();
    };
    HP.prototype.upTotal = function (increase) {
        this.maxHP += increase;
    };
    HP.prototype.down = function (damage) {
        this.currentHP -= damage;
        if (this.currentHP < 0) {
            this.currentHP = 0;
        }
        this.repaint();
    };
    HP.prototype.downTotal = function (decrease) {
        this.maxHP -= decrease;
        if (this.maxHP <= 0) {
            this.maxHP += decrease;
            console.log("eerror HP!");
        }
    };
    Object.defineProperty(HP.prototype, "_currentHP", {
        get: function () {
            return this.currentHP;
        },
        enumerable: true,
        configurable: true
    });
    HP.prototype.repaint = function () {
        if (this.healthBar.parent) {
            this.removeChild(this.healthBar);
            this.healthBar = new egret.Shape();
            this.healthBar.graphics.beginFill(0x00ff00, 1);
            var trueLength = (this.currentHP / this.maxHP) * HP.healthBarLength;
            this.healthBar.graphics.drawRect(0, 0, trueLength, HP.healthBarHeight);
            this.healthBar.graphics.endFill();
            this.addChild(this.healthBar);
        }
        else {
            console.log("no healthbar");
        }
    };
    HP.healthBarLength = 180;
    HP.healthBarHeight = 20;
    return HP;
}(egret.DisplayObjectContainer));
