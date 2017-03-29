var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
////NPC has a DialoguePanel
var DialoguePanel = (function (_super) {
    __extends(DialoguePanel, _super);
    function DialoguePanel(stage) {
        _super.call(this);
        this._stage = stage;
        this.belowPanel = new engine.Shape();
        this.belowPanel.width = DialoguePanel.TOTAL_WIDTH;
        this.belowPanel.height = DialoguePanel.TOTAL_HEIGHT;
        // this.belowPanel.graphics.beginFill(0x000000, 0.5);
        // this.belowPanel.graphics.drawRect(0, 0, DialoguePanel.TOTAL_WIDTH, DialoguePanel.TOTAL_HEIGHT);
        // this.belowPanel.graphics.endFill();
        this.addChild(this.belowPanel);
        this.button = new engine.Shape();
        this.button.width = DialoguePanel.BUTTON_WIDTH;
        this.button.height = DialoguePanel.BUTTON_HEIGHT;
        this.button.x = 500;
        this.button.y = 500;
        // this.button.graphics.beginFill(0x000000, 0.5);
        // this.button.graphics.drawRect((DialoguePanel.TOTAL_WIDTH - DialoguePanel.BUTTON_WIDTH) / 2, DialoguePanel.TOTAL_HEIGHT - DialoguePanel.BUTTON_HEIGHT, DialoguePanel.BUTTON_WIDTH, DialoguePanel.BUTTON_HEIGHT);
        // this.button.graphics.endFill();
        this.addChild(this.button);
        this.buttonText = new engine.TextField();
        this.buttonText.x = 500;
        this.buttonText.y = 500;
        this.addChild(this.buttonText);
        this.textField = new engine.TextField();
        this.textField.y = 10;
        //this.textField.width = DialoguePanel.TOTAL_WIDTH;
        this.addChild(this.textField);
        this.touchEnable = true;
    }
    DialoguePanel.prototype.onButtonClick = function () {
        if (this.taskcondition._task.getTaskStatus() == TaskStatus.ACCEPTABLE) {
            console.log(this.taskcondition._task.getTaskId());
            TaskService.taskService.accept(this.taskcondition._task.getTaskId());
        }
        else if (this.taskcondition._task.getTaskStatus() == TaskStatus.CAN_SUBMIT
            && this.taskcondition._task.getcurrent() == this.taskcondition._task.getTotal()) {
            this.taskcondition.onAccept();
        }
    };
    DialoguePanel.TOTAL_WIDTH = 400;
    DialoguePanel.TOTAL_HEIGHT = 300;
    DialoguePanel.BUTTON_WIDTH = 100;
    DialoguePanel.BUTTON_HEIGHT = 70;
    return DialoguePanel;
}(engine.DisplayObjectContainer));
