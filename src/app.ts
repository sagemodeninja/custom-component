import { customComponent, CustomComponent } from './';

@customComponent('demo-component')
class DemoComponent extends CustomComponent {
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
