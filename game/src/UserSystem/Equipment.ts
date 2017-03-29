// TypeScript file


class Equipment {

    jewels: Jewel[] = [];

    private properties: Properties = new Properties()

    public uID: number;

    public _configID: number;

    constructor(configID: number) {

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

    get fightPower() {

        var result = 100;
        this.jewels.forEach(jewel => result += jewel.fightPower);
        return result;
    }

    getTotalValueByName(propertyName: PropertyName) {

        var result = this.properties.getPropertyByName(propertyName);
        this.jewels.forEach(jewel => result += jewel.getTotalValueByName(propertyName));
        return result;
    }

    addJewel(jewel: Jewel) {

        this.jewels.push(jewel);
    }
}