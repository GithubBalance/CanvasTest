// TypeScript file
var WalkCommand = (function () {
    function WalkCommand(x, y) {
        this.x = x;
        this.y = y;
    }
    WalkCommand.prototype.execute = function (callback) {
        Grid.getCurrentScene().moveTo(this.x, this.y, function () {
            callback();
        });
    };
    WalkCommand.prototype.cancel = function (callback) {
        Grid.getCurrentScene().stopMove(function () {
            callback();
        });
    };
    return WalkCommand;
}());
var FightCommand = (function () {
    function FightCommand(monster) {
        /**
         * 所有的 Command 都需要有这个标记，应该如何封装处理这个问题呢？
         */
        this._hasBeenCancelled = false;
        this.monster = monster;
    }
    FightCommand.prototype.execute = function (callback) {
        var _this = this;
        console.log("开始战斗");
        this.monster.takeDamage(User.user.getTotalValueByName(PropertyName.ATTACK));
        User.user.stateMachine.fightState();
        egret.setTimeout(function () {
            if (!_this._hasBeenCancelled) {
                console.log("结束战斗");
                User.user.stateMachine.Idel();
                callback();
            }
        }, this, 500);
    };
    FightCommand.prototype.cancel = function (callback) {
        console.log("脱离战斗");
        this._hasBeenCancelled = true;
        egret.setTimeout(function () {
            callback();
        }, this, 100);
    };
    return FightCommand;
}());
var TalkCommand = (function () {
    function TalkCommand(stage, talkPanel) {
        this.stage = stage;
        this.talkPanel = talkPanel;
    }
    TalkCommand.prototype.execute = function (callback) {
        var _this = this;
        this.stage.addChild(this.talkPanel);
        User.user.locked++;
        this.talkPanel.x = (Grid.getCurrentScene().getnumCols() * DrawTileMap.TILE_SIZE - this.talkPanel.width) / 2;
        this.talkPanel.y = (Grid.getCurrentScene().getnumRows() * DrawTileMap.TILE_SIZE - this.talkPanel.height) / 2;
        this.talkPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.talkPanel.onButtonClick();
            if (_this.talkPanel.parent) {
                _this.stage.removeChild(_this.talkPanel);
                User.user.locked--;
            }
            callback();
        }, this);
    };
    TalkCommand.prototype.cancel = function (callback) {
    };
    return TalkCommand;
}());
