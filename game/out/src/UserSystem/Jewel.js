// TypeScript file
var Jewel = (function () {
    function Jewel(jewelHP, jewelDefence, jewelAtk, jewelCrit) {
        this.level = 1;
        this.properties = new Properties();
        this.properties.createProperties(jewelHP, jewelDefence, jewelAtk, jewelCrit);
    }
    Jewel.prototype.levelUp = function () {
        this.level++;
    };
    Jewel.prototype.getTotalValueByName = function (propertyName) {
        return this.properties.getPropertyByName(propertyName);
    };
    Object.defineProperty(Jewel.prototype, "fightPower", {
        get: function () {
            var result = this.level * 30;
            return result;
        },
        enumerable: true,
        configurable: true
    });
    return Jewel;
}());
