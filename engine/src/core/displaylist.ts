namespace engine {

    /**
     * 定义一个鼠标事件
     */
    export class _TouchEvent {

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
        useCapture = false;

        constructor(Mouse_Event: MOUSE_EVENT, listener: (e?: MouseEvent) => void, useCapture?: boolean) {
            this.Mouse_Event = Mouse_Event;
            this.listener = listener;
            if (useCapture) {
                this.useCapture = useCapture;
            }
        }
    }

    /**
     * 鼠标事件枚举类型
     */
    export enum MOUSE_EVENT {
        mousedown = 1,
        mousemove = 2,
        mouseup = 3,
        click = 4
    }

    /**
     * DisplayObject类型枚举
     */
    export enum DISPLAYOBJECT_TYPE {
        Bitmap = 1,
        TextField = 2,
        Shape = 3,
        MovieClip = 4,
        Container = 5
    }

    /**
     * 碰撞检测
     */
    export interface Hitable {
        hitTest(hitPoint: math.Point): DisplayObject;
    }

    /**
     * 事件派发器接口
     */
    export interface IDispatcher {

        /**
        * addEventListener添加的所有事件存储在此数组
        */
        selfEvents: _TouchEvent[];

        /**
         * 注册事件侦听器
         */
        addEventListener(eventType: MOUSE_EVENT, listener: (e?: MouseEvent) => void, useCapture?: boolean);

        /**
         * 删除事件侦听器
         */
        removeEventListener(eventType: MOUSE_EVENT, listener: Function, useCapture?: boolean);

        /**
         * 派发一个鼠标事件
         */
        dispatchEvent(type: MOUSE_EVENT);
    }

    export abstract class Dispatcher {

        /**
         * 本次鼠标事件需要执行的事件队列，按照捕获后的顺序
         */
        static doEventOrderList: _TouchEvent[] = [];

        /**
         * 执行事件队列
         */
        static doEventList(e: MouseEvent) {
            for (let i of Dispatcher.doEventOrderList) {
                i.listener(e);
            }
            Dispatcher.doEventOrderList = [];
        }

        /**
         * 派发对应type的鼠标事件
         */
        static dispatchChain(allEvents: _TouchEvent[], type: MOUSE_EVENT) {
            for (let i = 0; i < allEvents.length; i++) {
                if (type == allEvents[i].Mouse_Event) {
                    if (allEvents[i].useCapture) {
                        Dispatcher.doEventOrderList.unshift(allEvents[i]);
                    } else {
                        Dispatcher.doEventOrderList.push(allEvents[i]);
                    }
                }
            }
        }

    }

    export abstract class DisplayObject implements Hitable, IDispatcher {


        /**
         * DisplayObject种类
         */
        type: DISPLAYOBJECT_TYPE;

        /**
         * 需要画出的显示对象组
         */
        static renderList: DisplayObject[] = [];

        /**
         * 父容器
         */
        parent: DisplayObjectContainer;

        /**
         * addEventListener添加的所有事件存储在此数组
         */
        selfEvents: _TouchEvent[] = [];

        x = 0;
        y = 0;

        globalAlpha = 1;

        /**
         * 透明度
         */
        alpha = 1;

        ScaleX = 1;
        ScaleY = 1;

        /**
         *旋转(角度制)
         */
        rotation = 0;

        globalMatrix: math.Matrix;
        localMatrix: math.Matrix;

        /**
         * 是否检测碰撞
         */
        touchEnable: boolean = true;

        /**
         * 计算矩阵。
         */
        calculate(context: CanvasRenderingContext2D) {

            if (this.analysisMatrix(context)) {
                if (!this.parent) {
                    this.globalAlpha = this.alpha;
                } else {
                    this.globalAlpha = this.alpha * this.parent.globalAlpha;
                }
            } else {
                console.log("container wrong!");
                return;
            }
        }

        /**
         * 子类覆写该方法获得碰撞检测
         */
        abstract hitTest(hitPoint: math.Point): DisplayObject;

        /**
         * 添加事件侦听器
         */
        addEventListener(type: MOUSE_EVENT, react: (e?: MouseEvent) => void, useCapture?: boolean) {

            var selfEvent;
            if (useCapture) {
                selfEvent = new _TouchEvent(type, react, useCapture);
            } else {
                selfEvent = new _TouchEvent(type, react);
            }
            this.selfEvents.push(selfEvent);
        }

        /**
         * 删除事件侦听器
         */
        removeEventListener(eventType: MOUSE_EVENT, listener: Function, useCapture?: boolean) {

            for (let i = 0; i < this.selfEvents.length; i++) {
                let compare = this.selfEvents[i]
                if (compare.Mouse_Event == eventType
                    && compare.listener == listener
                    && compare.useCapture == useCapture) {

                    this.selfEvents.splice(i, 1);
                    console.log("remove success!");
                    break;
                }
            }
        }

        /**
         * 判断是否存在事件侦听器
         */
        hasEventListener(): boolean {
            return this.selfEvents && this.selfEvents.length == 0 ? false : true
        }

        /**
         * 根据是否开启捕获，发送事件到事件队列头或尾
         */
        dispatchEvent(type: MOUSE_EVENT) {
            Dispatcher.dispatchChain(this.selfEvents, type);

            let father = this.parent;
            if (father) {
                father.dispatchEvent(type);
            }
        }

        /**
         * 计算全局矩阵和本地矩阵,成功则返回true,并且将自己加入渲染数组。
         */
        protected analysisMatrix(context: CanvasRenderingContext2D): boolean {

            this.localMatrix = new math.Matrix();
            this.localMatrix.updateFromDisplayObject(this.x, this.y, this.ScaleX, this.ScaleY, this.rotation);

            if (!this.parent) {
                this.globalMatrix = this.localMatrix;
            } else {
                this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);
            }

            //计算矩阵后加入渲染组。
            DisplayObject.renderList.push(this);
            return true;
        }
    }

    export class DisplayObjectContainer extends DisplayObject {

        /**
         * 显示列表
         */
        children: DisplayObject[] = [];

        constructor() {
            super();
            this.type = DISPLAYOBJECT_TYPE.Container;
        }


        /**
         * 添加一个现实对象，成功返回true
         */
        addChild(newElement: DisplayObject): boolean {

            this.children.push(newElement);
            newElement.parent = this;
            return true;
        }

        /**
         * 删除指定子容器
         */
        removeChild(deleteElement: DisplayObject): boolean {

            let index = this.indexOfChildren(deleteElement);

            if (index == -1) {
                console.log("no element found!!");
                return false;
            } else {
                this.children.splice(index, 1);
                return true;
            }
        }

        /**
         * 交换两个子物体，成功返回true，失败返回false
         */
        swapChildren(object1: DisplayObject, object2: DisplayObject): boolean {
            let object1Index = this.indexOfChildren(object1);
            let object2Index = this.indexOfChildren(object2);

            if (object1Index == -1 || object2Index == -1) {
                return false;
            } else {
                let temp = this.children[object1Index];
                this.children[object1Index] = this.children[object2Index];
                this.children[object2Index] = temp;
                return true;
            }
        }

        /**
         * 判断是否存在传入的子物体，存在则返回子物体位置，否则返回-1
         */
        indexOfChildren(object: DisplayObject): number {

            let goalNumber = 0;
            let ifExist = false;
            for (let del of this.children) {
                if (del == object) {
                    ifExist = true;
                    break;
                }
                goalNumber++;
            }
            return ifExist ? goalNumber : -1
        }

        /**
         * 覆写父类的calculate方法，除了计算自己的矩阵外，还需要遍历children
         * 调用children的calculate方法。
         */
        calculate(context: CanvasRenderingContext2D) {

            if (this.analysisMatrix(context)) {
                if (!this.parent) {
                    this.globalAlpha = this.alpha;
                } else {
                    this.globalAlpha = this.alpha * this.parent.globalAlpha;
                }
                for (var i = 0; i < this.children.length; i++) {
                    this.children[i].calculate(context);
                }
            } else {
                console.log("container wrong!");
                return;
            }
        }

        /**
         * container的hitTest方法会遍历children的hitTest方法
         * 如子物体的hitTest检测成功，则返回被点击到的子物体
         */
        hitTest(hitPoint: math.Point): DisplayObject {
            for (let i = this.children.length - 1; i >= 0; i--) {
                let child = this.children[i];
                let invertChildLocalMatrix = math.invertMatrix(this.localMatrix);
                let pointBaseOnChild = math.pointAppendMatrix(hitPoint, invertChildLocalMatrix);
                let hitTestResult = child.hitTest(pointBaseOnChild);

                if (hitTestResult) {
                    return hitTestResult;
                }
            }
            return null;
        }
    }


    /**
     * 舞台
     */
    export class Stage extends DisplayObjectContainer {

        /**
         * 舞台宽
         */
        stageW: number;

        /**
         * 舞台高
         */
        stageH: number;

        constructor(stageX: number, stageY: number) {
            super();
            this.stageW = stageX;
            this.stageH = stageY;
            this.type = DISPLAYOBJECT_TYPE.Container;
        }
    }

    /**
     * 图形(暂时为矩形)
     */
    export class Shape extends DisplayObject {

        /**
         * 图形宽度
         */
        width = 0;

        /**
         * 图形高度
         */
        height = 0;

        /**
         * 图形颜色
         */
        color = "#000000";

        constructor() {
            super();
            this.type = DISPLAYOBJECT_TYPE.Shape;
        }

        /**
         * 检测是否点击到Shape
         */
        hitTest(hitPoint: math.Point): DisplayObject {

            var rect = new math.Rectangle();
            rect.width = this.width;
            rect.height = this.height;
            let invertChildLocalMatrix = math.invertMatrix(this.localMatrix);
            let pointBaseOnChild = math.pointAppendMatrix(hitPoint, invertChildLocalMatrix);
            return rect.isPointInRect(pointBaseOnChild) && this.touchEnable ? this : null;
        }
    }

    export class TextField extends DisplayObject {

        /**
         * 文本内容
         */
        text = "";

        /**
         * 文本颜色
         */
        color = "#000000";

        /**
         * 文本格式，例如"15px Arial"
         */
        font = "15px Arial";

        /**
         * 测量文本宽度
         */
        _measureTextWidth: number = 0;

        constructor() {
            super();
            this.type = DISPLAYOBJECT_TYPE.TextField;
        }

        /**
         * 判断是否点击到文字
         */
        hitTest(hitPoint: math.Point): DisplayObject {

            var rect = new math.Rectangle();
            rect.width = this._measureTextWidth;
            rect.height = 20;
            let invertChildLocalMatrix = math.invertMatrix(this.localMatrix);
            let pointBaseOnChild = math.pointAppendMatrix(hitPoint, invertChildLocalMatrix);
            return rect.isPointInRect(pointBaseOnChild) && this.touchEnable ? this : null;
        }
    }

    export class Bitmap extends DisplayObject {

        /**
         * 图片的资源代理类
         */
        img: RES.ImageResource;

        constructor() {
            super();
            this.type = DISPLAYOBJECT_TYPE.Bitmap;
        }

        /**
         * 改变bitmap
         */
        changeBitmap(name: string) {

            this.img = RES.getRES(name);
            RES.loadRes(name);
        }

        /**
         * 判断是否点击到图片
         */
        hitTest(hitPoint: math.Point): DisplayObject {

            var rect = new math.Rectangle();
            rect.width = this.img.width;
            rect.height = this.img.height;
            let invertChildLocalMatrix = math.invertMatrix(this.localMatrix);
            let pointBaseOnChild = math.pointAppendMatrix(hitPoint, invertChildLocalMatrix);
            return rect.isPointInRect(pointBaseOnChild) && this.touchEnable ? this : null;
        }
    }

    /**
     * 动画类
     */
    export class MovieClip extends Bitmap {

        private advancedTime = 0;

        private static FRAME_TIME = 60;

        private TOTAL_FRAME = 0;

        private currentFrameIndex: number;

        public data: MovieClipData = { name: "", frames: [] };

        constructor(data: MovieClipData) {
            super();
            this.type = DISPLAYOBJECT_TYPE.MovieClip;
            this.setMovieClipData(data);
            this.play();
        }

        ticker = (deltaTime) => {

            this.advancedTime += deltaTime;
            if (this.advancedTime >= MovieClip.FRAME_TIME * this.TOTAL_FRAME) {
                this.advancedTime -= MovieClip.FRAME_TIME * this.TOTAL_FRAME;
            }
            this.currentFrameIndex = Math.floor(this.advancedTime / MovieClip.FRAME_TIME);

            let data = this.data;

            let frameData = data.frames[this.currentFrameIndex];
            let newUrl = frameData.image;
            this.changeBitmap(newUrl);
        }

        play() {
            Ticker.getInstance().register(this.ticker);
        }

        stop() {
            Ticker.getInstance().unregister(this.ticker);
        }

        setMovieClipData(data: MovieClipData) {
            this.data = data;
            this.currentFrameIndex = 0;
            this.TOTAL_FRAME = this.data.frames.length;
        }
    }

    /**
     * 动画数据类型，包含一个动画的名称以及此动画的帧信息
     */
    export type MovieClipData = {
        name: string,
        frames: MovieClipFrameData[]
    }

    /**
     * 动画的帧信息，储存图片的名称。
     */
    export type MovieClipFrameData = {
        "image": string
    }

    /**
     * 生成MovieClipData的工厂类，构造函数传入每一帧的图片名称，再调用generateMovieClipData方法，
     * 传入一个动画名称，生成对应的MovieClipData。
     */
    export class MovieClipFrameDataFactory {

        private names: string[] = [];

        constructor(names: string[]) {
            if (!names) {
                console.log("no names");
                return;
            }
            this.names = names;
        }

        /**
         * 传入动画名称，生成对应的MovieClipData
         */
        generateMovieClipData(animationName: string): MovieClipData {
            var result: MovieClipData = { name: "", frames: [] };
            result.name = animationName;
            for (let urlIndex = 0; urlIndex < this.names.length; urlIndex++) {
                let movieClipFrameData: MovieClipFrameData = { image: "" };
                movieClipFrameData.image = this.names[urlIndex];
                result.frames.push(movieClipFrameData);
            }
            return result;
        }
    }
}