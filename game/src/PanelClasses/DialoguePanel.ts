

////NPC has a DialoguePanel
class DialoguePanel extends engine.DisplayObjectContainer {

    public _stage: engine.DisplayObjectContainer;
    public taskcondition: TaskCondition;

    public textField: engine.TextField;
    public buttonText: engine.TextField;
    public button: engine.Shape;
    public belowPanel: engine.Shape;

    public static TOTAL_WIDTH = 400;
    public static TOTAL_HEIGHT = 300;

    public static BUTTON_WIDTH = 100;
    public static BUTTON_HEIGHT = 70;

    public constructor(stage: engine.DisplayObjectContainer) {

        super();

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
        this.button.x = 500
        this.button.y = 500
        // this.button.graphics.beginFill(0x000000, 0.5);
        // this.button.graphics.drawRect((DialoguePanel.TOTAL_WIDTH - DialoguePanel.BUTTON_WIDTH) / 2, DialoguePanel.TOTAL_HEIGHT - DialoguePanel.BUTTON_HEIGHT, DialoguePanel.BUTTON_WIDTH, DialoguePanel.BUTTON_HEIGHT);
        // this.button.graphics.endFill();
        this.addChild(this.button);

        this.buttonText = new engine.TextField();
        this.buttonText.x =500;
        this.buttonText.y = 500;
        this.addChild(this.buttonText);

        this.textField = new engine.TextField();
        this.textField.y = 10;
        //this.textField.width = DialoguePanel.TOTAL_WIDTH;
        this.addChild(this.textField);

        this.touchEnable = true;

    }

    onButtonClick() {

        if (this.taskcondition._task.getTaskStatus() == TaskStatus.ACCEPTABLE) {
            console.log(this.taskcondition._task.getTaskId());
            TaskService.taskService.accept(this.taskcondition._task.getTaskId());
        }

        else if (this.taskcondition._task.getTaskStatus() == TaskStatus.CAN_SUBMIT
            && this.taskcondition._task.getcurrent() == this.taskcondition._task.getTotal()) {
            this.taskcondition.onAccept();
        }
    }
}