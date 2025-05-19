import { Components } from './components'

export class renderComponent {
    private components: Components[] = [];
    
    constructor() {
        this.components = [];
    }

    public addComponent(component: Components): void {
        this.components.push(component);
    }

    public render(): void {
        
        for (const component of this.components) {
            const objectGame = component.getComponent();
            if (objectGame) {
                objectGame.update();
                objectGame.render();
            }
        }
    }

}