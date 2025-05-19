interface Vector {
    x: number;
    y: number;
}

interface Size {
    width: number;
    hight: number;
}

export class ObjectGame {
    protected name: string;
    protected position: Vector;
    protected rotate: number;
    protected scale: number;
    protected size: Size;

    constructor() {
        this.position = { x: 0, y: 0 };
        this.rotate = 0;
        this.scale = 1;
        this.size = { width: 0, hight: 0 };
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
        this.scale = scale;
    }

    getSize(): Size {
        return this.size;
    }
    setSize(size: Size): void {
        this.size = size;
    }

    update(deltaTime: number): void {
      
    }

    render(): void {
        
    }
}