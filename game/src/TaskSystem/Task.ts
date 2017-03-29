

class Task implements TaskConditionContext {

	public _id: string;
	public _name: string;
	public _status: TaskStatus;
	public _current: number;
	public _total: number;

	private observerList: Observer[] = [];
	private _condition: TaskCondition;

	public constructor(id: string, name: string, status: TaskStatus, total: number, condition: TaskCondition) {

		this._id = id;
		this._name = name;
		this._status = status;
		this._current = 0;
		this._total = total;
		this._condition = condition;
	}

	addObserver(o: Observer) {

		this.observerList.push(o);
	}

	checkStatus() {

		if (this._current > this._total) {
			console.error("What?!");
		}
		if (this._current == this._total) {
			this._status = TaskStatus.CAN_SUBMIT;
		}
		if (this._current == -2) {
			this._status = TaskStatus.SUBMITTED;
			TaskService.taskService.accept("Task02")
		}

		this.notify();
	}

	notify() {

		for (let observer of this.observerList) {
			observer.onChange();
		}
	}

	getcurrent(): number {
		return this._current;
	}

	setcurrent(cur: number) {
		this._current = cur;
		this.checkStatus();
	}

	getTaskId(): string {
		return this._id;
	}

	getTaskStatus(): TaskStatus {
		return this._status;
	}

	getTotal(): number {
		return this._total;
	}

	getName():string{
		return this._name;
	}
}

enum TaskStatus {
	
	UNACCEPTABLE = 0,
	ACCEPTABLE = 1,
	DURING = 2,
	CAN_SUBMIT = 3,
	SUBMITTED = 4
}

