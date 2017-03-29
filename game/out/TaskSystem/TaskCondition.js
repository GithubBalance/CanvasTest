var TaskCondition = (function () {
    function TaskCondition(task, total, fromNpcId, toNpcId, desc) {
        this._task = task;
        this._current = 0;
        this._total = total;
        this._fromNpcId = fromNpcId;
        this._toNpcId = toNpcId;
        this._desc = desc;
    }
    TaskCondition.prototype.onAccept = function () {
        this._current = -2;
        this._task.setcurrent(this._current);
    };
    TaskCondition.prototype.onSubmit = function () {
        this._current++;
        this._task.setcurrent(this._current);
    };
    return TaskCondition;
}());
var TASK_CONDITION;
(function (TASK_CONDITION) {
    TASK_CONDITION[TASK_CONDITION["NPC_TALK"] = 1] = "NPC_TALK";
    TASK_CONDITION[TASK_CONDITION["KILL_MONSTER"] = 2] = "KILL_MONSTER";
})(TASK_CONDITION || (TASK_CONDITION = {}));
