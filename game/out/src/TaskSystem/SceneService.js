var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SceneService = (function (_super) {
    __extends(SceneService, _super);
    function SceneService() {
        _super.call(this);
        this.taskConditionList = [];
        this.sceneStuffList = [];
    }
    SceneService.prototype.addTaskCondition = function (o) {
        this.taskConditionList.push(o);
        this.notify();
    };
    ////////////添加NPC,panel
    SceneService.prototype.addSceneStuff = function (o) {
        this.sceneStuffList.push(o);
        this.notify();
    };
    SceneService.prototype.notify = function () {
        for (var _i = 0, _a = this.sceneStuffList; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.onChange();
        }
    };
    return SceneService;
}(EventEmitter));
