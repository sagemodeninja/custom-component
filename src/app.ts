import { ComponentRegistry } from './component-registry';
import { CustomComponent } from './custom-component';

class DemoComponent extends CustomComponent {
    static elementName = 'demo-component';
    static styles = `
        span {
            color: red;
        }

        ::slotted(p) {
            color: green;
        }
    `;

    public render(): string {
        return `
            <div>
                <span>I am a demo!</span>
                <slot></slot>
            </div>
        `;
    }
}

ComponentRegistry.createRegistry().register(DemoComponent);
