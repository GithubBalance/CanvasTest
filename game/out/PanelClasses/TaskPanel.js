var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
////任务面板，始终显示在舞台
var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel(sceneService) {
        _super.call(this);
        this._sceneService = sceneService;
        this.textField = new engine.TextField();
        this.taskPanelTexture = new engine.Bitmap();
        this.taskPanelTexture.url = "taskpanel.png";
        TaskPanel.TOTAL_HEIGHT = this.taskPanelTexture.height;
        TaskPanel.TOTAL_WIDTH = this.taskPanelTexture.width;
        //this.textField.width = TaskPanel.TOTAL_WIDTH;
        this.addChild(this.taskPanelTexture);
        this.addChild(this.textField);
    }
    TaskPanel.prototype.onChange = function () {
        var count = 0;
        for (var _i = 0, _a = this._sceneService.taskConditionList; _i < _a.length; _i++) {
            var taskCondition = _a[_i];
            if (taskCondition._task.getTaskStatus() == TaskStatus.DURING ||
                taskCondition._task.getTaskStatus() == TaskStatus.CAN_SUBMIT) {
                count++;
                this.textField.text = taskCondition._task.getTaskId() + ": " + taskCondition._task.getName();
                ;
            }
        }
        if (count == 0) {
            this.textField.text = " ";
        }
    };
    return TaskPanel;
}(engine.DisplayObjectContainer));
