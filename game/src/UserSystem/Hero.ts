// TypeScript file


class Hero {

    equipments: Equipment[] = [];

    public static uId: number = 0;

    public configId: number;

    private properties: Properties = new Properties();

    private level = 1;

    constructor(configId: number, heroHP: number, heroDefence: number, heroAtk: number, heroCrit: number) {

        this.configId = configId;
        Hero.uId++;
        this.properties.createProperties(heroHP, heroDefence, heroAtk, heroCrit);
    }

    addLevel() {

        this.level++;
    }

    get fightPower() {

        var result = this.level * 100;
        this.equipments.forEach(equiptment => result += equiptment.fightPower);

        return result;
    }

    addEquipment(equipment: Equipment) {
        this.equipments.push(equipment);
    }
}