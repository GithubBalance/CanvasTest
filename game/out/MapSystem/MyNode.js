var MyNode = (function () {
    function MyNode(x, y) {
        this.walkable = true;
        this.costMultiplier = 1.0;
        this.x = x;
        this.y = y;
    }
    return MyNode;
}());
