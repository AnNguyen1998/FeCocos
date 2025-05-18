interface Vector {
    x: number;
    y: number;
}

export class ObjectGame {
    protected name: string;
    protected position: Vector;
    protected rotate: number;
    protected scale: number;
    protected size: Vector;

    constructor() {

    }

    getName(): string {
        return this.name;
    }
    setName(name: string): void {
        this.name = name;
    }

    getPosition(): Vector {
        return this.position;
    }
    setPosition(position: Vector): void {
        this.position = position;
    }

    getRotate(): number {
        return this.rotate;
    }
    setRotate(rotate: number): void {
        this.rotate = rotate;
    }

    getScale(): number {
        return this.scale;
    }
    setScale(scale: number): void {
        this.scale = this.scale;
    }

    getSize(): Vector {
        return this.size;
    }
    setSize(size: Vector): void {
        this.size = size;
    }

}