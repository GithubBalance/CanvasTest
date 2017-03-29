// TypeScript file

class KillMonsterTaskCondition extends TaskCondition implements Observer {

    public _monsterID: string;

    public constructor(task: TaskConditionContext, total: number, monsterID: string, fromNpcId: string, toNpcId: string, desc: string) {
        super(task, total, fromNpcId, toNpcId, desc);
        this._monsterID = monsterID;
    }

    onChange() {

    }
}