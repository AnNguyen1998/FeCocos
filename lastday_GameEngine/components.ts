import { ObjectGame } from "./objectGame";

export class Components {
    private component: ObjectGame;

    constructor() {

    }

    setComponent(obj: ObjectGame): void{
        this.component = obj;
    }

    getComponent(): ObjectGame {
        return this.component;
    }

}