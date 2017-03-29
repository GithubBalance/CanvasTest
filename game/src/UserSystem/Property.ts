// TypeScript file

class Property {

    name: string;

    value: number;

    isRate: boolean;

    constructor(name: string, value: number, isRate: boolean) {

        this.name = name;
        this.value = value;
        this.isRate = isRate;
    }
}

class Properties {

    all: Property[] = []

    getPropertyByName(Pname: PropertyName): number {

        return this.all[Pname].value;
    }

    createProperties(HP: number, Defence: number, Atk: number, Crit: number) {
        this.all[PropertyName.HP] = new Property("生命值", HP, false);
        this.all[PropertyName.DENFENCE] = new Property("防御力", Defence, false);
        this.all[PropertyName.ATTACK] = new Property("攻击力", Atk, false);
        this.all[PropertyName.CRITICAL] = new Property("暴击率", Crit, true);
    }
}

enum PropertyName {
    HP = 0,
    DENFENCE = 1,
    ATTACK = 2,
    CRITICAL = 3
}