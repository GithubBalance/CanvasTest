declare namespace math {
    class Point {
        x: number;
        y: number;
        constructor(x: number, y: number);
    }
    class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor();
        isPointInRect(point: math.Point): boolean;
    }
    function pointAppendMatrix(point: Point, m: Matrix): Point;
    /**
     * 使用伴随矩阵法求逆矩阵
     * http://wenku.baidu.com/view/b0a9fed8ce2f0066f53322a9
     */
    function invertMatrix(m: Matrix): Matrix;
    function matrixAppendMatrix(m1: Matrix, m2: Matrix): Matrix;
    class Matrix {
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;
        toString(): string;
        updateFromDisplayObject(x: number, y: number, scaleX: number, scaleY: number, rotation: number): void;
    }
}
declare namespace engine {
    type Ticker_Listener_Type = (deltaTime: number) => void;
    class Ticker {
        private static instance;
        listeners: Ticker_Listener_Type[];
        static getInstance(): Ticker;
        register(listener: Ticker_Listener_Type): void;
        unregister(listener: Ticker_Listener_Type): void;
        notify(deltaTime: number): void;
    }
}
declare namespace engine {
    /**
     * 定义一个鼠标事件
     */
    class _TouchEvent {
        /**
         * 鼠标事件类型
         */
        Mouse_Event: MOUSE_EVENT;
        /**
         * 事件
         */
        listener: (e?: MouseEvent) => void;
        /**
         * 是否开启捕捉
         */
        useCapture: boolean;
        constructor(Mouse_Event: MOUSE_EVENT, listener: (e?: MouseEvent) => void, useCapture?: boolean);
    }
    /**
     * 鼠标事件枚举类型
     */
    enum MOUSE_EVENT {
        mousedown = 1,
        mousemove = 2,
        mouseup = 3,
        click = 4,
    }
    /**
     * DisplayObject类型枚举
     */
    enum DISPLAYOBJECT_TYPE {
        Bitmap = 1,
        TextField = 2,
        Shape = 3,
        MovieClip = 4,
        Container = 5,
    }
    /**
     * 碰撞检测
     */
    interface Hitable {
        hitTest(hitPoint: math.Point): DisplayObject;
    }
    /**
     * 事件派发器接口
     */
    interface IDispatcher {
        /**
        * addEventListener添加的所有事件存储在此数组
        */
        selfEvents: _TouchEvent[];
        /**
         * 注册事件侦听器
         */
        addEventListener(eventType: MOUSE_EVENT, listener: (e?: MouseEvent) => void, useCapture?: boolean): any;
        /**
         * 删除事件侦听器
         */
        removeEventListener(eventType: MOUSE_EVENT, listener: Function, useCapture?: boolean): any;
        /**
         * 派发一个鼠标事件
         */
        dispatchEvent(type: MOUSE_EVENT): any;
    }
    abstract class Dispatcher {
        /**
         * 本次鼠标事件需要执行的事件队列，按照捕获后的顺序
         */
        static doEventOrderList: _TouchEvent[];
        /**
         * 执行事件队列
         */
        static doEventList(e: MouseEvent): void;
        /**
         * 派发对应type的鼠标事件
         */
        static dispatchChain(allEvents: _TouchEvent[], type: MOUSE_EVENT): void;
    }
    abstract class DisplayObject implements Hitable, IDispatcher {
        /**
         * DisplayObject种类
         */
        type: DISPLAYOBJECT_TYPE;
        /**
         * 需要画出的显示对象组
         */
        static renderList: DisplayObject[];
        /**
         * 父容器
         */
        parent: DisplayObjectContainer;
        /**
         * addEventListener添加的所有事件存储在此数组
         */
        selfEvents: _TouchEvent[];
        x: number;
        y: number;
        globalAlpha: number;
        /**
         * 透明度
         */
        alpha: number;
        ScaleX: number;
        ScaleY: number;
        /**
         *旋转(角度制)
         */
        rotation: number;
        globalMatrix: math.Matrix;
        localMatrix: math.Matrix;
        /**
         * 是否检测碰撞
         */
        touchEnable: boolean;
        /**
         * 计算矩阵。
         */
        calculate(context: CanvasRenderingContext2D): void;
        /**
         * 子类覆写该方法获得碰撞检测
         */
        abstract hitTest(hitPoint: math.Point): DisplayObject;
        /**
         * 添加事件侦听器
         */
        addEventListener(type: MOUSE_EVENT, react: (e?: MouseEvent) => void, useCapture?: boolean): void;
        /**
         * 删除事件侦听器
         */
        removeEventListener(eventType: MOUSE_EVENT, listener: Function, useCapture?: boolean): void;
        /**
         * 判断是否存在事件侦听器
         */
        hasEventListener(): boolean;
        /**
         * 根据是否开启捕获，发送事件到事件队列头或尾
         */
        dispatchEvent(type: MOUSE_EVENT): void;
        /**
         * 计算全局矩阵和本地矩阵,成功则返回true,并且将自己加入渲染数组。
         */
        protected analysisMatrix(context: CanvasRenderingContext2D): boolean;
    }
    class DisplayObjectContainer extends DisplayObject {
        /**
         * 显示列表
         */
        children: DisplayObject[];
        constructor();
        /**
         * 添加一个现实对象，成功返回true
         */
        addChild(newElement: DisplayObject): boolean;
        /**
         * 删除指定子容器
         */
        removeChild(deleteElement: DisplayObject): boolean;
        /**
         * 交换两个子物体，成功返回true，失败返回false
         */
        swapChildren(object1: DisplayObject, object2: DisplayObject): boolean;
        /**
         * 判断是否存在传入的子物体，存在则返回子物体位置，否则返回-1
         */
        indexOfChildren(object: DisplayObject): number;
        /**
         * 覆写父类的calculate方法，除了计算自己的矩阵外，还需要遍历children
         * 调用children的calculate方法。
         */
        calculate(context: CanvasRenderingContext2D): void;
        /**
         * container的hitTest方法会遍历children的hitTest方法
         * 如子物体的hitTest检测成功，则返回被点击到的子物体
         */
        hitTest(hitPoint: math.Point): DisplayObject;
    }
    /**
     * 舞台
     */
    class Stage extends DisplayObjectContainer {
        /**
         * 舞台宽
         */
        stageW: number;
        /**
         * 舞台高
         */
        stageH: number;
        constructor(stageX: number, stageY: number);
    }
    /**
     * 图形(暂时为矩形)
     */
    class Shape extends DisplayObject {
        /**
         * 图形宽度
         */
        width: number;
        /**
         * 图形高度
         */
        height: number;
        /**
         * 图形颜色
         */
        color: string;
        constructor();
        /**
         * 检测是否点击到Shape
         */
        hitTest(hitPoint: math.Point): DisplayObject;
    }
    class TextField extends DisplayObject {
        /**
         * 文本内容
         */
        text: string;
        /**
         * 文本颜色
         */
        color: string;
        /**
         * 文本格式，例如"15px Arial"
         */
        font: string;
        /**
         * 测量文本宽度
         */
        _measureTextWidth: number;
        constructor();
        /**
         * 判断是否点击到文字
         */
        hitTest(hitPoint: math.Point): DisplayObject;
    }
    class Bitmap extends DisplayObject {
        /**
         * 图片的资源代理类
         */
        img: RES.ImageResource;
        constructor();
        /**
         * 改变bitmap
         */
        changeBitmap(name: string): void;
        /**
         * 判断是否点击到图片
         */
        hitTest(hitPoint: math.Point): DisplayObject;
    }
    /**
     * 动画类
     */
    class MovieClip extends Bitmap {
        private advancedTime;
        private static FRAME_TIME;
        private TOTAL_FRAME;
        private currentFrameIndex;
        data: MovieClipData;
        constructor(data: MovieClipData);
        ticker: (deltaTime: any) => void;
        play(): void;
        stop(): void;
        setMovieClipData(data: MovieClipData): void;
    }
    /**
     * 动画数据类型，包含一个动画的名称以及此动画的帧信息
     */
    type MovieClipData = {
        name: string;
        frames: MovieClipFrameData[];
    };
    /**
     * 动画的帧信息，储存图片的名称。
     */
    type MovieClipFrameData = {
        "image": string;
    };
    /**
     * 生成MovieClipData的工厂类，构造函数传入每一帧的图片名称，再调用generateMovieClipData方法，
     * 传入一个动画名称，生成对应的MovieClipData。
     */
    class MovieClipFrameDataFactory {
        private names;
        constructor(names: string[]);
        /**
         * 传入动画名称，生成对应的MovieClipData
         */
        generateMovieClipData(animationName: string): MovieClipData;
    }
}
declare namespace RES {
    type imageConfig = [{
        name: string;
        width: number;
        height: number;
        url: string;
    }];
    class ImageLoader {
        static imageResourcesMap: {};
        static loadImageConfig(imageConfigs: imageConfig): void;
    }
    function loadRes(name: any): void;
    /**
     * 获取配置文件里的资源
     */
    function getRES(key: string): ImageResource;
    /**
    * 图片资源代理
    */
    class ImageResource {
        bitmapData: HTMLImageElement;
        name: string;
        url: string;
        width: number;
        height: number;
        load(): void;
    }
}
declare namespace engine {
    let run: (canvas: HTMLCanvasElement) => Stage;
    /**
     * cancas2D渲染器
     */
    class canvas2DRenderer {
        private canvas2DContext;
        private stage;
        constructor(canvas: HTMLCanvasElement, stage: Stage);
        draw(): void;
        /**
         * 渲染图片或动画
         */
        private renderBitmapAndMovieClip(bitmap);
        /**
         * 渲染文字
         */
        private renderTextField(textField);
        /**
         * 渲染图形
         */
        private renderShape(shape);
    }
}
