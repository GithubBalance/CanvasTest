var Machine = (function () {
    function Machine() {
        this.towardLeft = false;
        this.standing = new StandState(this);
        this.running = new RunState(this);
        this.fight = new FightState(this);
        this.state = this.standing;
        this.state.onEnter();
    }
    Machine.prototype.Idel = function () {
        if (this.state != this.standing) {
            this.state.onExit();
            this.state = this.standing;
            this.state.onEnter();
        }
        else {
            console.log("allready standing!");
        }
    };
    Machine.prototype.runState = function () {
        this.state.onExit();
        this.state = this.running;
        this.state.onEnter();
    };
    Machine.prototype.fightState = function () {
        if (this.state != this.fight) {
            this.state.onExit();
            this.state = this.fight;
            this.state.onEnter();
        }
        else {
            console.log("allready fight!");
        }
    };
    Machine.prototype.setState = function (state) {
        this.state = state;
    };
    Machine.prototype.getState = function () {
        return this.state;
    };
    Machine.Speed = 0.125;
    return Machine;
}());
var StandState = (function () {
    function StandState(machine) {
        this.machine = machine;
    }
    StandState.prototype.onEnter = function () {
        if (this.machine.towardLeft) {
            User.user.changeAnimationByName("向左站立");
        }
        else {
            User.user.changeAnimationByName("站立");
        }
        this.machine.Idel();
    };
    StandState.prototype.onExit = function () {
        console.log("Exit Idel");
    };
    return StandState;
}());
var RunState = (function () {
    function RunState(machine) {
        this.machine = machine;
    }
    RunState.prototype.onEnter = function () {
        if (this.machine.towardLeft) {
            User.user.changeAnimationByName("向左奔跑");
        }
        else {
            User.user.changeAnimationByName("奔跑");
        }
        this.machine.setState(this.machine.running);
    };
    RunState.prototype.onExit = function () {
        console.log("Exit Running");
    };
    return RunState;
}());
var FightState = (function () {
    function FightState(machine) {
        this.machine = machine;
    }
    FightState.prototype.onEnter = function () {
        this.machine.setState(this.machine.fight);
        User.user.changeAnimationByName("向左断踢");
    };
    FightState.prototype.onExit = function () {
        console.log("Exit Running");
    };
    return FightState;
}());
