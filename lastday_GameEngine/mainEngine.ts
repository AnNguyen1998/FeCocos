import { renderComponent } from "./renderComponent";

export class mainEngine {
    private static instance: mainEngine;
    private isRunning: boolean = false;
    private lastTime: number = 0;
    private renderComponent: renderComponent;

    private constructor() {
        this.renderComponent = new renderComponent();
    }

    public static getInstance(): mainEngine {
        if (!mainEngine.instance) {
            mainEngine.instance = new mainEngine();
        }
        return mainEngine.instance;
    }

    private gameLoop(timeStamp: number): void {
        if (!this.isRunning) return;

        if (!this.lastTime) {
            this.lastTime = timeStamp;
        }

        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;

        this.update(deltaTime);

        this.render();

        requestAnimationFrame((time) => this.gameLoop(time));
    }

    private update(deltaTime: number): void {
        
    }

    private render(): void {
        this.renderComponent.render();
    }

    public gameStart(): void {
        if (!this.isRunning) {
            this.isRunning = true;
            this.lastTime = 0;
            requestAnimationFrame((time) => this.gameLoop(time));
            console.log("Game started");
        }
    }

    public gameStop(): void {
        this.isRunning = false;
        console.log("Game stopped");
    }

    public gameUpdate(): void {
        if (!this.isRunning) {
            this.gameStart();
        }
    }
}