
interface TaskConditionContext {

	getcurrent(): number;
	setcurrent(cur: number);
	getTaskId(): string;
	getTaskStatus(): TaskStatus;
	getTotal(): number;
	getName(): string;
}

class TaskCondition {

	public _task: TaskConditionContext;
	public _current: number;
	public _total: number;

	public _fromNpcId: string;
	public _toNpcId: string;

	public _desc: string;

	public constructor(task: TaskConditionContext, total: number, fromNpcId: string, toNpcId: string, desc: string) {

		this._task = task;
		this._current = 0;
		this._total = total;
		this._fromNpcId = fromNpcId;
		this._toNpcId = toNpcId;
		this._desc = desc;
	}

	onAccept() {
		this._current = -2;
		this._task.setcurrent(this._current);
	}

	onSubmit() {
		this._current++;
		this._task.setcurrent(this._current);
	}
}

enum TASK_CONDITION {
	NPC_TALK = 1,
	KILL_MONSTER = 2
}