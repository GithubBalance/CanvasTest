var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DPSMonster = (function (_super) {
    __extends(DPSMonster, _super);
    function DPSMonster(sceneService, monsterID) {
        _super.call(this);
        this._monsterID = monsterID;
        this._sceneService = sceneService;
        this.damageNumber = new engine.TextField();
        this.addChild(this.damageNumber);
        for (var i = 0; i < monsterConfig.length; i++) {
            if (monsterID == monsterConfig[i].monsterID) {
                this.hp = new HP(monsterConfig[i].maxHP, monsterConfig[i].maxHP);
                this.addChild(this.hp);
                this.defence = monsterConfig[i].defence;
                this.atk = monsterConfig[i].atk;
                break;
            }
        }
    }
    DPSMonster.prototype.onMonsterClick = function () { };
    ;
    DPSMonster.prototype.giveReward = function () { };
    ;
    DPSMonster.prototype.attack = function () { };
    DPSMonster.prototype.takeDamage = function (damage) {
        var _this = this;
        var crit = Math.random() * 100;
        if (crit < User.user.getTotalValueByName(PropertyName.CRITICAL) / 10) {
            this.hp.down(damage * 2 - this.defence);
            this.damageNumber.text = "暴击 -" + (damage * 2 - this.defence);
        }
        else {
            this.hp.down(damage - this.defence);
            this.damageNumber.text = "-" + (damage - this.defence);
        }
        setTimeout(function () {
            _this.damageNumber.text = " ";
        }, this, 500);
        if (this.hp._currentHP <= 0) {
            setTimeout(this.death, this, 500);
        }
    };
    DPSMonster.prototype.death = function () {
    };
    return DPSMonster;
}(engine.DisplayObjectContainer));
var FrogMonster = (function (_super) {
    __extends(FrogMonster, _super);
    function FrogMonster(sceneService, monsterID) {
        var _this = this;
        _super.call(this, sceneService, monsterID);
        this.touchEnable = true;
        this.monsterTexture = new engine.Bitmap();
        this.monsterTexture.url = "monster.png";
        this.addChild(this.monsterTexture);
        this.damageNumber.y = -100;
        this.textField = new engine.TextField();
        this.textField.text = "悲伤的青蛙";
        this.textField.x = 10;
        this.textField.y = -30;
        this.addChild(this.textField);
        this.addEventListener(engine.MOUSE_EVENT.click, function () {
            _this.onMonsterClick();
        });
        var internal = setInterval(function () {
            if (Math.abs(User.user.animationContainer.x - _this.x) <= DrawTileMap.TILE_SIZE * 3 &&
                Math.abs(User.user.animationContainer.y - _this.y) <= DrawTileMap.TILE_SIZE * 3) {
                _this.attack();
            }
        }, 2000);
    }
    FrogMonster.prototype.findTaskConditionByRule = function () {
        var condition;
        for (var i = 0; i < this._sceneService.taskConditionList.length; i++) {
            if (this._sceneService.taskConditionList[i]["_monsterID"] == this._monsterID &&
                this._sceneService.taskConditionList[i]._task.getTaskStatus() == TaskStatus.DURING) {
                condition = this._sceneService.taskConditionList[i];
                break;
            }
        }
        return condition;
    };
    FrogMonster.prototype.onMonsterClick = function () {
        if (User.user.locked) {
            return;
        }
        var nodeX = Math.floor(this.x / DrawTileMap.TILE_SIZE);
        var nodeY = Math.floor(this.y / DrawTileMap.TILE_SIZE);
        User.user.commandList.cancel();
        if (User.user.animationContainer.x != (nodeX + 2) * DrawTileMap.TILE_SIZE ||
            User.user.animationContainer.y != nodeY * DrawTileMap.TILE_SIZE) {
            User.user.commandList.addCommand(new WalkCommand(nodeX + 2, nodeY));
        }
        console.log(this);
        var condition = this.findTaskConditionByRule();
        if (condition) {
            User.user.commandList.addCommand(new FightCommand(this));
        }
        User.user.commandList.execute();
    };
    FrogMonster.prototype.death = function () {
        var condition = this.findTaskConditionByRule();
        if (!condition) {
            console.error("critical error! Monster Die!");
            return;
        }
        condition.onSubmit();
        this.removeEventListener(engine.MOUSE_EVENT.click, this.onMonsterClick);
        this.removeChild(this.hp);
        this.monsterTexture.url = "reward.png";
        this.textField.text = " ";
        this.giveReward();
        this.removeChild(this.damageNumber);
    };
    FrogMonster.prototype.giveReward = function () {
        var _this = this;
        this.addEventListener(engine.MOUSE_EVENT.click, function () { _this.pickupEquipment; });
    };
    FrogMonster.prototype.attack = function () {
        var condition = this.findTaskConditionByRule();
        if (!condition) {
            return;
        }
        // var texture = "newParticle.png";
        // var config = "newParticle_json";
        // var system = new particle.GravityParticleSystem(texture, config);
        // system.start();
        // this.addChild(system);
        // system.x = 120;
        // system.y = 70
        User.user.takeDamage(this.atk);
        // var targetPoint: engine.Point = this.globalToLocal(User.user.animationContainer.x, User.user.animationContainer.y);
        // engine.Tween.get(system).to({ x: targetPoint.x, y: targetPoint.y }, 500, engine.Ease.sineIn).call(() => {
        //     system.stop();
        //     this.removeChild(system);
        //     
        // });
    };
    FrogMonster.prototype.pickupEquipment = function () {
        var _this = this;
        this.textField.text = " ";
        this.monsterTexture.url = null;
        if (this.hasEventListener) {
            this.removeEventListener(engine.MOUSE_EVENT.click, this.pickupEquipment);
        }
        User.user.addEquipmentInPackage(new Equipment(1000));
        User.user.addEquipmentInPackage(new Equipment(1001));
        User.user.addEquipmentInPackage(new Equipment(1002));
        User.user.addEquipmentInPackage(new Equipment(1003));
        User.user.addEquipmentInPackage(new Equipment(1004));
        User.user.addEquipmentInPackage(new Equipment(1005));
        setTimeout(function () {
            var dragon = new DragonMonster(_this._sceneService, "monster2");
            dragon.x = 200;
            dragon.y = 800;
            _this.parent.addChild(dragon);
            _this.parent.swapChildren(_this, dragon);
        }, this, 8000);
    };
    return FrogMonster;
}(DPSMonster));
var DragonMonster = (function (_super) {
    __extends(DragonMonster, _super);
    function DragonMonster(sceneService, monsterID) {
        var _this = this;
        _super.call(this, sceneService, monsterID);
        this.touchEnable = true;
        this.monsterTexture = new engine.Bitmap();
        this.monsterTexture.url = "dragon.png";
        this.addChild(this.monsterTexture);
        this.damageNumber.y = -100;
        this.textField = new engine.TextField();
        this.textField.text = "电龙";
        this.textField.x = 10;
        this.textField.y = -50;
        this.addChild(this.textField);
        this.hp.x = -40;
        this.addEventListener(engine.MOUSE_EVENT.click, function () { _this.onMonsterClick; });
        this.internal = setInterval(function () {
            if (Math.abs(User.user.animationContainer.x - _this.x) <= DrawTileMap.TILE_SIZE * 3 &&
                Math.abs(User.user.animationContainer.y - _this.y) <= DrawTileMap.TILE_SIZE * 3) {
                _this.attack();
            }
        }, 2000);
    }
    DragonMonster.prototype.onMonsterClick = function () {
        if (User.user.locked) {
            return;
        }
        var nodeX = Math.floor(this.x / DrawTileMap.TILE_SIZE);
        var nodeY = Math.floor(this.y / DrawTileMap.TILE_SIZE);
        User.user.commandList.cancel();
        if (User.user.animationContainer.x != (nodeX + 2) * DrawTileMap.TILE_SIZE ||
            User.user.animationContainer.y != nodeY * DrawTileMap.TILE_SIZE) {
            User.user.commandList.addCommand(new WalkCommand(nodeX + 2, nodeY));
        }
        User.user.commandList.addCommand(new FightCommand(this));
        User.user.commandList.execute();
    };
    DragonMonster.prototype.death = function () {
        this.removeEventListener(engine.MOUSE_EVENT.click, this.onMonsterClick);
        this.removeChild(this.hp);
        this.monsterTexture.url = null;
        clearInterval(this.internal);
        this.textField.text = " ";
        this.giveReward();
        this.removeChild(this.damageNumber);
    };
    DragonMonster.prototype.giveReward = function () {
    };
    DragonMonster.prototype.attack = function () {
        // var texture = "newParticle.png";
        // var config = "newParticle_json";
        // var system = new particle.GravityParticleSystem(texture, config);
        // system.start();
        // this.addChild(system);
        // system.x = 120;
        // system.y = 70
        // var targetPoint: engine.Point = this.globalToLocal(User.user.animationContainer.x, User.user.animationContainer.y);
        // engine.Tween.get(system).to({ x: targetPoint.x, y: targetPoint.y }, 500, engine.Ease.sineIn).call(() => {
        //     system.stop();
        //     this.removeChild(system);
        User.user.takeDamage(this.atk);
        //     console.log(this.atk);
        // });
    };
    return DragonMonster;
}(DPSMonster));
