var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NPCTalkTaskCondition = (function (_super) {
    __extends(NPCTalkTaskCondition, _super);
    function NPCTalkTaskCondition(task, fromNpcId, toNpcId, desc) {
        _super.call(this, task, 1, fromNpcId, toNpcId, desc);
        this._fromNpcId = fromNpcId;
        this._toNpcId = toNpcId;
    }
    NPCTalkTaskCondition.prototype.onChange = function () {
    };
    return NPCTalkTaskCondition;
}(TaskCondition));
