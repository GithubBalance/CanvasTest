// TypeScript file
var Hero = (function () {
    function Hero(configId, heroHP, heroDefence, heroAtk, heroCrit) {
        this.equipments = [];
        this.properties = new Properties();
        this.level = 1;
        this.configId = configId;
        Hero.uId++;
        this.properties.createProperties(heroHP, heroDefence, heroAtk, heroCrit);
    }
    Hero.prototype.addLevel = function () {
        this.level++;
    };
    Object.defineProperty(Hero.prototype, "fightPower", {
        get: function () {
            var result = this.level * 100;
            this.equipments.forEach(function (equiptment) { return result += equiptment.fightPower; });
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Hero.prototype.addEquipment = function (equipment) {
        this.equipments.push(equipment);
    };
    Hero.uId = 0;
    return Hero;
}());
