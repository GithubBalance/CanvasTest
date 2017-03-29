var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC(bitMapName, id, stage, sceneService) {
        var _this = this;
        _super.call(this);
        ////返回当前可交或可接任务条件
        this.rule = function (taskConditionList) {
            for (var _i = 0, taskConditionList_1 = taskConditionList; _i < taskConditionList_1.length; _i++) {
                var taskCondition = taskConditionList_1[_i];
                if ((taskCondition._task.getTaskStatus() == TaskStatus.ACCEPTABLE && taskCondition._fromNpcId == _this._id) ||
                    (taskCondition._task.getTaskStatus() == TaskStatus.CAN_SUBMIT && taskCondition._toNpcId == _this._id)) {
                    return taskCondition;
                }
            }
            return null;
        };
        this.touchEnable = true;
        this._id = id;
        this._panel = new DialoguePanel(stage);
        this._stage = stage;
        this._sceneService = sceneService;
        this.bitMapNPC = new engine.Bitmap;
        this.bitMapNPC.url = bitMapName;
        ////NPC图片位置
        var scaleNum = NPC.NPC_HEIGHT / this.bitMapNPC.height; //缩放系数
        // this.bitMapNPC.scaleX = scaleNum;
        // this.bitMapNPC.scaleY = scaleNum;
        this.bitMapNPC.width = 100;
        this.bitMapNPC.height = NPC.NPC_HEIGHT;
        this.bitMapNPC.y = NPC.EMOJI_SIZE + NPC.NPC_EMOJI_DISTANCE; //NPC位置应在任务图标下方
        ////标识位置
        this.emoji = new engine.Bitmap;
        this.emoji.height = NPC.EMOJI_SIZE;
        this.emoji.width = NPC.EMOJI_SIZE;
        this.emoji.x = (this.bitMapNPC.width * scaleNum - NPC.EMOJI_SIZE) / 2;
        this.addChild(this.bitMapNPC);
        this.addEventListener(engine.MOUSE_EVENT.click, function () {
            _this.onNPCClick();
        });
    }
    NPC.prototype.onChange = function () {
        var taskcondition = this.rule(this._sceneService.taskConditionList);
        if (taskcondition == null) {
            this.emoji.url = null;
            return ErrorCode.MISSING_TASK;
        }
        if (taskcondition._fromNpcId == this._id && taskcondition._task.getTaskStatus() == TaskStatus.ACCEPTABLE) {
            this.emoji.url = "emoji1.png";
            this.addChild(this.emoji);
        }
        else if (taskcondition._toNpcId == this._id && taskcondition._task.getTaskStatus() == TaskStatus.CAN_SUBMIT) {
            this.emoji.url = "emoji2.png";
            this.addChild(this.emoji);
        }
        else {
            this.emoji.url = null;
        }
    };
    NPC.prototype.onNPCClick = function () {
        if (User.user.locked) {
            return;
        }
        var nodeX = Math.floor(this.x / DrawTileMap.TILE_SIZE);
        var nodeY = Math.floor(this.y / DrawTileMap.TILE_SIZE);
        User.user.commandList.cancel();
        if (User.user.animationContainer.x != (nodeX - 1) * DrawTileMap.TILE_SIZE ||
            User.user.animationContainer.y != nodeY * DrawTileMap.TILE_SIZE) {
            User.user.commandList.addCommand(new WalkCommand(nodeX - 1, nodeY));
        }
        var taskcondition = this.rule(this._sceneService.taskConditionList);
        console.log(taskcondition);
        if (taskcondition == null) {
            console.log("No Mission On this NPC");
            User.user.commandList.execute();
            return;
        }
        ////添加命令////
        User.user.commandList.addCommand(new TalkCommand(this._stage, this._panel));
        User.user.commandList.execute();
        ///////////////
        ////修改对话框按钮内容////
        this._panel.textField.text = taskcondition._desc;
        this._panel.taskcondition = taskcondition;
        if (taskcondition._task.getTaskStatus() == TaskStatus.ACCEPTABLE) {
            this._panel.buttonText.text = "接受";
        }
        else if (taskcondition._task.getTaskStatus() == TaskStatus.CAN_SUBMIT) {
            this._panel.buttonText.text = "完成";
        }
        else {
            this._panel.buttonText.text = "继续";
        }
        ////////////////////
    };
    ////NPC贴图大小
    NPC.NPC_HEIGHT = 120;
    ////NPC任务标示大小
    NPC.EMOJI_SIZE = 25;
    ////NPC与任务标识间距
    NPC.NPC_EMOJI_DISTANCE = 10;
    return NPC;
}(engine.DisplayObjectContainer));
