export class Engine {
    public static instance: Engine;

    constructor () {

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

    gameStart(): void{

    }

    gameUpdate(): void{

    }

    gameStop(): void{

    }
    
}