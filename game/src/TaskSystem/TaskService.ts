

class TaskService extends EventEmitter implements Observer {

	private sceneService: SceneService;

	private taskList: {
		[index: string]: Task
	} = {};

	public static taskService: TaskService;

	public constructor(sceneService: SceneService) {
		super();
		this.sceneService = sceneService;
		if (!TaskService.taskService) {
			TaskService.taskService = this;
		}
		return TaskService.taskService;
	}

	public addTask(task: Task) {
		this.taskList[task._id] = task;
		this.taskList[task._id].addObserver(this);
		this.notify();
	}

	accept(id: string): ErrorCode {

		if (!id) {
			return ErrorCode.MISSING_TASK;
		}

		let task = this.taskList[id];

		if (!task) {
			return ErrorCode.MISSING_TASK;
		}

		if (task._status == TaskStatus.ACCEPTABLE || task._status == TaskStatus.UNACCEPTABLE) {

			if (task._status == TaskStatus.ACCEPTABLE) {
				task._status = TaskStatus.DURING;
			}
			else if (task._status == TaskStatus.UNACCEPTABLE) {
				task._status = TaskStatus.ACCEPTABLE;
			}
			task.checkStatus();
			this.notify();
			return ErrorCode.SUCCESS;
		}
		return ErrorCode.MISSING_TASK
	}

	notify() {
		this.sceneService.notify();
	}

	onChange() {
		this.notify();
	}

}

enum ErrorCode {
	MISSING_TASK = 0,
	SUCCESS = 1,
}

interface Observer {
	onChange();
}