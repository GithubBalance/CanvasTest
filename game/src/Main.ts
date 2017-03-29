
window.onload = () => {
    var c = document.getElementById("myCanvas") as HTMLCanvasElement;
    var stage = engine.run(c);

    var map = new DrawTileMap();
    stage.addChild(map);

    var gameSence = new Grid();

    var user = new User(100, 20, 30, 22);
    stage.addChild(User.user.animationContainer);
    Grid.getCurrentScene().setPlayerPositionOnMap(1, 1);


    var task: Task = new Task("Task01", "欢迎来到迷之游戏！这是新手任务！", TaskStatus.ACCEPTABLE, 0, npctalkcondition);
    var task2: Task = new Task("Task02", "去杀死悲伤的青蛙！", TaskStatus.UNACCEPTABLE, 1, killcondition);

    var npctalkcondition = new NPCTalkTaskCondition(task, "npc1", "npc2", task._name);

    var killcondition = new KillMonsterTaskCondition(task2, task2._total, "monster1", "npc2", "npc2", task2._name);

    var sceneservice: SceneService = new SceneService();

    var npc1: NPC = new NPC("NPC1.png", "npc1", stage, sceneservice);
    var npc2: NPC = new NPC("NPC2.png", "npc2", stage, sceneservice);

    var taskPanel = new TaskPanel(sceneservice);

    var mockMonster: DPSMonster = new FrogMonster(sceneservice, "monster1");


    npc1.x = 700;
    npc1.y = 800;
    npc2.x = 400;
    npc2.y = 400;
    mockMonster.x = 200;
    mockMonster.y = 800;


    taskPanel.x = 1000;

    taskPanel.y = 500;

    stage.addChild(npc1);
    stage.addChild(npc2);
    stage.addChild(taskPanel);
    stage.addChild(mockMonster);

    var taskservice: TaskService = new TaskService(sceneservice);

    taskservice.addTask(task);
    taskservice.addTask(task2);

    sceneservice.addTaskCondition(killcondition);
    sceneservice.addTaskCondition(npctalkcondition);
    sceneservice.addSceneStuff(npc1);
    sceneservice.addSceneStuff(npc2);
    sceneservice.addSceneStuff(taskPanel);


    var ui = new UI();
    stage.addChild(ui);


    var user = new User(100, 50, 200, 0);

    User.user.setUI(ui);
}