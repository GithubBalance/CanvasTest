namespace RES {

    export type imageConfig = [
        {
            name: string,
            width: number,
            height: number,
            url: string
        }
    ]

    export class ImageLoader {

        static imageResourcesMap = {};

        static loadImageConfig(imageConfigs: imageConfig) {

            for (let config of imageConfigs) {

                let imageData = new ImageResource();
                imageData.height = config.height;
                imageData.width = config.width;
                imageData.url = config.url;
                imageData.name = config.name;

                ImageLoader.imageResourcesMap[imageData.name] = imageData;
            }
        }
    }


    export function loadRes(name) {
        var resource = getRES(name);
        resource.load();
    }

    /**
     * 获取配置文件里的资源
     */
    export function getRES(key: string): ImageResource {
        if (!ImageLoader.imageResourcesMap[key]) {
            ImageLoader.imageResourcesMap[key] = new ImageResource();
        }
        return ImageLoader.imageResourcesMap[key];
    }

    /**
    * 图片资源代理
    */
    export class ImageResource {

        public bitmapData: HTMLImageElement = new Image();
        public name: string;
        public url: string;
        public width: number;
        public height: number;

        public load() {
            var realResource = document.createElement("img");
            realResource.src = this.url;
            realResource.onload = () => {
                this.bitmapData = realResource;
            }
        }
    }
}