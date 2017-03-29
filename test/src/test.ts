window.onload = () => {
    var c = document.getElementById("myCanvas") as HTMLCanvasElement;
    var stage = engine.run(c);

    var config: RES.imageConfig = [
        {
            name: "loading.png",
            height: 100,
            width: 100,
            url: "../src/loading.png"
        },
        {
            name: "S0.png",
            height: 211,
            width: 135,
            url: "../src/S0.png"
        },
        {
            name: "S1.png",
            height: 211,
            width: 132,
            url: "../src/S1.png"
        },
        {
            name: "S2.png",
            height: 212,
            width: 130,
            url: "../src/S2.png"
        },
        {
            name: "S3.png",
            height: 212,
            width: 127,
            url: "../src/S3.png"
        },
        {
            name: "S4.png",
            height: 213,
            width: 123,
            url: "../src/S4.png"
        },
        {
            name: "S5.png",
            height: 214,
            width: 119,
            url: "../src/S5.png"
        },
        {
            name: "S6.png",
            height: 215,
            width: 116,
            url: "../src/S6.png"
        },
        {
            name: "S7.png",
            height: 215,
            width: 115,
            url: "../src/S7.png"
        },
        {
            name: "S8.png",
            height: 214,
            width: 118,
            url: "../src/S8.png"
        },
        {
            name: "S9.png",
            height: 212,
            width: 127,
            url: "../src/S9.png"
        },
        {
            name: "S10.png",
            height: 211,
            width: 132,
            url: "../src/S10.png"
        },
        {
            name: "S11.png",
            height: 211,
            width: 133,
            url: "../src/S11.png"
        },
        {
            name: "S12.png",
            height: 211,
            width: 136,
            url: "../src/S12.png"
        }
    ]

    ////加载配置文件////
    RES.ImageLoader.loadImageConfig(config);
    ///////////////////

    var image = new engine.Bitmap();
    image.img = RES.getRES("S0.png");
    RES.loadRes("S0.png");

    var container = new engine.DisplayObjectContainer();
    container.addChild(image);
    container.x = 200;
    container.y = 200;

    stage.addChild(container);


    var names: string[] = ["S0.png", "S1.png", "S2.png", "S3.png", "S4.png", "S5.png", "S6.png",
        "S7.png", "S8.png", "S9.png", "S10.png", "S11.png", "S12.png"];

    var movieClipFactory = new engine.MovieClipFrameDataFactory(names);

    var result = movieClipFactory.generateMovieClipData("run");

    var animation = new engine.MovieClip(result);

    animation.x = 500;
    animation.y = 500;

    stage.addChild(animation);

    container.addEventListener(engine.MOUSE_EVENT.click, (e) => {
        console.log("111")
    }, true);

    image.addEventListener(engine.MOUSE_EVENT.click, (e) => {
        console.log("222")
    });
}
