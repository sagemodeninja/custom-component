import { customComponent, CustomComponent, parameter } from './';

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

    static get observedAttributes() {
        return ['color', 'sample-text'];
    }

    // @parameter()
    public color: string = 'green';

    // @parameter('sample-text')
    public text: string = 'Hello World!';

    public override render(): string {
        return `
            <div>
                <span style="color: ${this.color};">I am a demo!</span>
                <slot></slot>
            </div>
        `;
    }

    // protected override onParametersSet(): void {
    //     console.log('I was set!');
    // }
}

@customComponent('another-component')
class AnotherComponent extends CustomComponent {
    render() {
        return '';
    }
}

var x = new AnotherComponent();
const demoComponent = document.getElementById('demo') as DemoComponent;

demoComponent.color = 'blue';
demoComponent.text = 'Hello, Philippines!';
