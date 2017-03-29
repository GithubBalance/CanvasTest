

interface State {

    onEnter();
    onExit();
}

class Machine {

    private state: State;

    public standing: State;

    public running: State;

    public fight: State;

    public towardLeft = false;


    public static Speed: number = 0.125;

    public constructor() {

        this.standing = new StandState(this);
        this.running = new RunState(this);
        this.fight = new FightState(this);

        this.state = this.standing;
        this.state.onEnter();
    }

    public Idel(): void {

        if (this.state != this.standing) {

            this.state.onExit();
            this.state = this.standing;
            this.state.onEnter();

        } else {

            console.log("allready standing!");
        }
    }

    public runState(): void {

        this.state.onExit();
        this.state = this.running;
        this.state.onEnter();

    }

    public fightState(): void {

        if (this.state != this.fight) {

            this.state.onExit();
            this.state = this.fight;
            this.state.onEnter();

        } else {
            console.log("allready fight!");
        }
    }

    public setState(state: State) {

        this.state = state;
    }

    public getState(): State {

        return this.state;
    }
}

class StandState implements State {

    private machine: Machine;

    public constructor(machine: Machine) {

        this.machine = machine;
    }

    public onEnter(): void {


        if (this.machine.towardLeft) {
            User.user.changeAnimationByName("向左站立");
        } else {
            User.user.changeAnimationByName("站立");
        }


        this.machine.Idel();
    }

    public onExit(): void {

        console.log("Exit Idel");
    }
}

class RunState implements State {

    private machine: Machine;

    public constructor(machine: Machine) {

        this.machine = machine;
    }

    public onEnter(): void {

        if (this.machine.towardLeft) {
            User.user.changeAnimationByName("向左奔跑");
        } else {
            User.user.changeAnimationByName("奔跑");
        }
        this.machine.setState(this.machine.running);

    }

    public onExit(): void {

        console.log("Exit Running")
    }
}

class FightState implements State {

    private machine: Machine;

    public constructor(machine: Machine) {

        this.machine = machine;
    }

    public onEnter(): void {

        this.machine.setState(this.machine.fight);
        User.user.changeAnimationByName("向左断踢");
    }

    public onExit(): void {

        console.log("Exit Running")
    }
}