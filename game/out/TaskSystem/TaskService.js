var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TaskService = (function (_super) {
    __extends(TaskService, _super);
    function TaskService(sceneService) {
        _super.call(this);
        this.taskList = {};
        this.sceneService = sceneService;
        if (!TaskService.taskService) {
            TaskService.taskService = this;
        }
        return TaskService.taskService;
    }
    TaskService.prototype.addTask = function (task) {
        this.taskList[task._id] = task;
        this.taskList[task._id].addObserver(this);
        this.notify();
    };
    TaskService.prototype.accept = function (id) {
        if (!id) {
            return ErrorCode.MISSING_TASK;
        }
        var task = this.taskList[id];
        if (!task) {
            return ErrorCode.MISSING_TASK;
        }
        if (task._status == TaskStatus.ACCEPTABLE || task._status == TaskStatus.UNACCEPTABLE) {
            if (task._status == TaskStatus.ACCEPTABLE) {
                task._status = TaskStatus.DURING;
            }
            else if (task._status == TaskStatus.UNACCEPTABLE) {
                task._status = TaskStatus.ACCEPTABLE;
            }
            task.checkStatus();
            this.notify();
            return ErrorCode.SUCCESS;
        }
        return ErrorCode.MISSING_TASK;
    };
    TaskService.prototype.notify = function () {
        this.sceneService.notify();
    };
    TaskService.prototype.onChange = function () {
        this.notify();
    };
    return TaskService;
}(EventEmitter));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["MISSING_TASK"] = 0] = "MISSING_TASK";
    ErrorCode[ErrorCode["SUCCESS"] = 1] = "SUCCESS";
})(ErrorCode || (ErrorCode = {}));
