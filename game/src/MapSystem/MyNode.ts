class MyNode {
    
    public x: number;
    public y: number;
    public f: number;
    public g: number;
    public h: number;
    public walkable: Boolean = true;
    public parent: MyNode;
    public costMultiplier: number = 1.0;
    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}