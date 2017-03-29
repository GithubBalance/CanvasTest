// TypeScript file
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var KillMonsterTaskCondition = (function (_super) {
    __extends(KillMonsterTaskCondition, _super);
    function KillMonsterTaskCondition(task, total, monsterID, fromNpcId, toNpcId, desc) {
        _super.call(this, task, total, fromNpcId, toNpcId, desc);
        this._monsterID = monsterID;
    }
    KillMonsterTaskCondition.prototype.onChange = function () {
    };
    return KillMonsterTaskCondition;
}(TaskCondition));
