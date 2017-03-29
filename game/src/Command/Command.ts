// TypeScript file

interface Command {

    execute(callback: Function): void;

    cancel(callback: Function): void;

}

class WalkCommand implements Command {

    private x;
    private y;


    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    execute(callback: Function): void {

        Grid.getCurrentScene().moveTo(this.x, this.y, function () {
            callback();
        })
    }

    cancel(callback: Function) {
        Grid.getCurrentScene().stopMove(function () {
            callback();
        })
    }
}

class FightCommand implements Command {
    /**
     * 所有的 Command 都需要有这个标记，应该如何封装处理这个问题呢？
     */
    private _hasBeenCancelled = false;

    private monster: IMonster

    public constructor(monster: DPSMonster) {

        this.monster = monster;

    }

    execute(callback: Function): void {


        console.log("开始战斗");

        this.monster.takeDamage(User.user.getTotalValueByName(PropertyName.ATTACK));

        User.user.stateMachine.fightState();

        setTimeout(() => {
            if (!this._hasBeenCancelled) {
                console.log("结束战斗")

                User.user.stateMachine.Idel();
                callback();
            }
        }, this, 500)
    }

    cancel(callback: Function) {
        console.log("脱离战斗")
        this._hasBeenCancelled = true;
        setTimeout(function () {
            callback();
        }, this, 100)
    }
}

class TalkCommand implements Command {

    private talkPanel: DialoguePanel;
    private stage: engine.DisplayObjectContainer;

    public constructor(stage: engine.DisplayObjectContainer, talkPanel: DialoguePanel) {

        this.stage = stage;
        this.talkPanel = talkPanel;
    }

    execute(callback: Function): void {

        this.stage.addChild(this.talkPanel);

        User.user.locked++;

        this.talkPanel.x = 500;
        this.talkPanel.y = 500;

        this.talkPanel.addEventListener(engine.MOUSE_EVENT.click, () => {

            this.talkPanel.onButtonClick();
            console.log("here");

            if (this.talkPanel.parent) {
                this.stage.removeChild(this.talkPanel);
                User.user.locked--;
            }
            callback();
        });
    }

    cancel(callback: Function) {

    }
}
