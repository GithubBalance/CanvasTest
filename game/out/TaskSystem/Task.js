var Task = (function () {
    function Task(id, name, status, total, condition) {
        this.observerList = [];
        this._id = id;
        this._name = name;
        this._status = status;
        this._current = 0;
        this._total = total;
        this._condition = condition;
    }
    Task.prototype.addObserver = function (o) {
        this.observerList.push(o);
    };
    Task.prototype.checkStatus = function () {
        if (this._current > this._total) {
            console.error("What?!");
        }
        if (this._current == this._total) {
            this._status = TaskStatus.CAN_SUBMIT;
        }
        if (this._current == -2) {
            this._status = TaskStatus.SUBMITTED;
            TaskService.taskService.accept("Task02");
        }
        this.notify();
    };
    Task.prototype.notify = function () {
        for (var _i = 0, _a = this.observerList; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.onChange();
        }
    };
    Task.prototype.getcurrent = function () {
        return this._current;
    };
    Task.prototype.setcurrent = function (cur) {
        this._current = cur;
        this.checkStatus();
    };
    Task.prototype.getTaskId = function () {
        return this._id;
    };
    Task.prototype.getTaskStatus = function () {
        return this._status;
    };
    Task.prototype.getTotal = function () {
        return this._total;
    };
    Task.prototype.getName = function () {
        return this._name;
    };
    return Task;
}());
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["UNACCEPTABLE"] = 0] = "UNACCEPTABLE";
    TaskStatus[TaskStatus["ACCEPTABLE"] = 1] = "ACCEPTABLE";
    TaskStatus[TaskStatus["DURING"] = 2] = "DURING";
    TaskStatus[TaskStatus["CAN_SUBMIT"] = 3] = "CAN_SUBMIT";
    TaskStatus[TaskStatus["SUBMITTED"] = 4] = "SUBMITTED";
})(TaskStatus || (TaskStatus = {}));
