import { CustomComponent } from './custom-component';
import { customComponent, query, property } from './attributes';

class TestObject {
    value: number;
}

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

    @property({ attribute: 'foreground-color' })
    public color: string;

    @property()
    public size: number;

    @property()
    public rates: number[];

    @property()
    public test: TestObject;

    @query('.text')
    private _textSpan: HTMLSpanElement;

    public render(): string {
        return `
            <div>
                <span class="text">I am a demo!</span>
                <slot></slot>
            </div>
        `;
    }

    protected override stateHasChanged(changes: Map<string, any>) {
        Object.keys(changes).forEach(prop => {
            switch (prop) {
                case 'color': this._textSpan.style.color = this.color;
            }
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const demo = document.getElementById('demo') as DemoComponent;
})
