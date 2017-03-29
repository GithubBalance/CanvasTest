// TypeScript file

class PropertyDisplayFactory {

    static xDistance = 200;
    static yDistance = 40;


    static create(body: any) {

        if (!body.getTotalValueByName) {

            console.log("error");
            return;
        }

        var container = new engine.DisplayObjectContainer();
        var x = 0;
        var y = 0;


        var fp = new engine.TextField();
        fp.text = "                          " + body.fightPower;
        fp.x = x;
        fp.y = y;
        container.addChild(fp);

        y += 50;


        for (var i = 0; i < body.properties.all.length; i++) {

            var tf = new engine.TextField();
            if (body.properties.all[i].isRate) {
                tf.text = body.properties.all[i].name + "：" + body.getTotalValueByName(i) / 10 + "%";
            }
            else {
                tf.text = body.properties.all[i].name + "：" + body.getTotalValueByName(i);
            }

            tf.x = x;
            tf.y = y;

            x += PropertyDisplayFactory.xDistance;
            if (x >= PropertyDisplayFactory.xDistance * 2) {
                y += PropertyDisplayFactory.yDistance;
                x = 0;
            }
            container.addChild(tf);
        }


        return container;
    }


    static createEquipmentContainer(body: any) {

        if (!body.getTotalValueByName) {

            console.log("error");
            return;
        }

        var container = new engine.DisplayObjectContainer();
        var x = 0;
        var y = 0;


        var fp = new engine.TextField();
        fp.text = "战斗力" + body.fightPower;
        fp.x = x;
        fp.y = y;
        container.addChild(fp);

        y += 50;


        for (var i = 0; i < body.properties.all.length; i++) {
            let property = body.properties.all[i]
            var tf = new engine.TextField();
            if (body.properties.all[i].isRate) {
                tf.text = property.name + "：" + body.getTotalValueByName(i) / 10 + "%";
            }
            else {
                tf.text = property.name + "：" + body.getTotalValueByName(i);
            }

            tf.x = x;
            tf.y = y;

            x += PropertyDisplayFactory.xDistance;
            if (x >= PropertyDisplayFactory.xDistance ) {
                y += PropertyDisplayFactory.yDistance;
                x = 0;
            }
            container.addChild(tf);
        }

        return container;
    }
}