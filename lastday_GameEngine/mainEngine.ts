import { renderComponent } from "./renderComponent";

export class Engine {
    public static instance: Engine;

    constructor () {
        this.gameUpdate();
    }

    public static getInstance(): Engine{
        if(!Engine.instance){
            Engine.instance = new Engine() ;
        }
        return Engine.instance;
    }

    private gameLoop(timeStamp): void {
        let lastTime;
        lastTime = lastTime || timeStamp;
        let deltaTime = timeStamp - lastTime;
        window.requestAnimationFrame(this.gameLoop);
    }
    isRunning: boolean = true;
    gameStart(): void{
        while (this.isRunning) {
            const render = new renderComponent();
        }
    }

    gameUpdate(): void{
        window.requestAnimationFrame(this.gameLoop);
    }

    gameStop(): void{
        const changeRunning = (isRunning) => {
            if(isRunning){
                isRunning = false;
            }
        }
    }
    
}