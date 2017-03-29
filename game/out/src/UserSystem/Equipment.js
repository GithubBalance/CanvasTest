// TypeScript file
var Equipment = (function () {
    function Equipment(configID) {
        this.jewels = [];
        this.properties = new Properties();
        for (var i = 0; i < equipmentConfig.length; i++) {
            if (equipmentConfig[i].configID == configID) {
                this._configID = configID;
                this.properties.createProperties(equipmentConfig[i].equipmentHP, equipmentConfig[i].equipmentDefence, equipmentConfig[i].equipmentAtk, equipmentConfig[i].equipmentCrit);
            }
        }
        if (!this._configID) {
            console.log("没有这件装备！！！");
        }
    }
    Object.defineProperty(Equipment.prototype, "fightPower", {
        get: function () {
            var result = 100;
            this.jewels.forEach(function (jewel) { return result += jewel.fightPower; });
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Equipment.prototype.getTotalValueByName = function (propertyName) {
        var result = this.properties.getPropertyByName(propertyName);
        this.jewels.forEach(function (jewel) { return result += jewel.getTotalValueByName(propertyName); });
        return result;
    };
    Equipment.prototype.addJewel = function (jewel) {
        this.jewels.push(jewel);
    };
    return Equipment;
}());
