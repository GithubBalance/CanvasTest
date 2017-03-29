// TypeScript file


class Jewel {

    private level: number = 1;

    private properties: Properties = new Properties()

    constructor(jewelHP: number, jewelDefence: number, jewelAtk: number, jewelCrit: number) {

        this.properties.createProperties(jewelHP, jewelDefence, jewelAtk, jewelCrit);
    }


    levelUp() {
        this.level++;
    }

    getTotalValueByName(propertyName: PropertyName) {
        return this.properties.getPropertyByName(propertyName);
    }

    get fightPower() {
        var result = this.level * 30;
        return result;
    }
}