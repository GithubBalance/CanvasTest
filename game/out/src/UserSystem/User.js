// TypeScript file
var User = (function () {
    function User(userHP, userDefence, userAtk, userCrit) {
        this.level = 1;
        this.properties = new Properties();
        this.locked = 0;
        ////////////////动画//////////////
        this.animationContainer = new egret.DisplayObjectContainer();
        //////////////////////////////////
        this.commandList = new CommandList();
        this.heroesPool = [];
        this.heroesInTeam = [];
        this.equipments = [];
        this.package = [];
        if (!User.user) {
            User.user = this;
            var data = RES.getRes("animation_json");
            var texture = RES.getRes("animation_png");
            this.animationClipFactory = new egret.MovieClipDataFactory(data, texture);
            this.animationClip = new egret.MovieClip(this.animationClipFactory.generateMovieClipData("站立"));
            this.animationContainer.addChild(this.animationClip);
            this.animationClip.gotoAndPlay(1, -1);
            this.stateMachine = new Machine();
            this.properties.createProperties(userHP, userDefence, userAtk, userCrit);
            this.hp = new HP(userHP, userHP);
        }
        return User.user;
    }
    User.prototype.setUI = function (ui) {
        this.UI = ui;
        this.hp.x = 120;
        this.hp.y = 20;
        this.UI.addChild(this.hp);
    };
    User.prototype.takeDamage = function (damage) {
        var result = damage - User.user.getTotalValueByName(PropertyName.DENFENCE);
        if (result <= 0) {
            return;
        }
        this.hp.down(result);
        if (this.hp._currentHP <= 0) {
            this.death();
        }
    };
    User.prototype.death = function () {
        this.UI.gameOverReaction();
    };
    User.prototype.addHero = function (hero) {
        this.heroesPool.push(hero);
    };
    User.prototype.addEquipment = function (equipment) {
        this.equipments.push(equipment);
        this.hp.upTotal(equipment.getTotalValueByName(PropertyName.HP));
        this.hp.up(equipment.getTotalValueByName(PropertyName.HP));
        if (this.UI) {
            this.UI.refresh();
        }
    };
    User.prototype.removeEquipment = function (equipment) {
        for (var i = 0; i < this.equipments.length; i++) {
            if (equipment._configID == this.equipments[i]._configID) {
                this.equipments.splice(i, 1);
                this.hp.downTotal(equipment.getTotalValueByName(PropertyName.HP));
                this.hp.down(equipment.getTotalValueByName(PropertyName.HP));
                break;
            }
        }
        if (this.UI) {
            this.UI.refresh();
        }
    };
    User.prototype.addEquipmentInPackage = function (equipment) {
        this.package.push(equipment);
        if (this.UI) {
            this.UI.refresh();
        }
    };
    User.prototype.removeEquipmentInPackage = function (equipment) {
        for (var i = 0; i < this.package.length; i++) {
            if (equipment._configID == this.package[i]._configID) {
                this.package.splice(i, 1);
            }
        }
        if (this.UI) {
            this.UI.refresh();
        }
    };
    //heroUpAndDown(heroUp, heroDown) {}
    User.prototype.levelUp = function () {
        this.level++;
    };
    Object.defineProperty(User.prototype, "fightPower", {
        get: function () {
            var result = this.level * 100;
            this.heroesInTeam.forEach(function (hero) { return result += hero.fightPower; });
            this.equipments.forEach(function (equip) { return result += equip.fightPower; });
            return result;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.getTotalValueByName = function (propertyName) {
        var result = this.properties.getPropertyByName(propertyName);
        this.equipments.forEach(function (equip) { return result += equip.getTotalValueByName(propertyName); });
        return result;
    };
    User.prototype.changeAnimationByName = function (name) {
        this.animationContainer.removeChild(this.animationClip);
        this.animationClip = new egret.MovieClip(this.animationClipFactory.generateMovieClipData(name));
        this.animationClip.gotoAndPlay(1, -1);
        this.animationContainer.addChild(this.animationClip);
    };
    return User;
}());
