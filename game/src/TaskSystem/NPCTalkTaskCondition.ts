
class NPCTalkTaskCondition extends TaskCondition implements Observer {


	public constructor(task: TaskConditionContext, fromNpcId: string, toNpcId: string, desc: string) {

		super(task, 1, fromNpcId, toNpcId, desc);
		this._fromNpcId = fromNpcId;
		this._toNpcId = toNpcId;

	}


	onChange() {

	}
}