import { CustomComponent } from './custom-component';
import { customComponent, query, property, queryAll } from './attributes';

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

    @queryAll('.text')
    private _textSpans: NodeListOf<HTMLSpanElement>;

    @query('.input', true)
    private _input: HTMLInputElement;

    @queryAll('.input', true)
    private _inputs: NodeListOf<HTMLInputElement>;

    public render(): string {
        return `
            <div>
                <span class="text">I am a demo!</span>
                <span class="text">I am another text!</span>
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

    public debug() {
        console.log('query()', this._textSpan)
        console.log('queryAll()', this._textSpans)
        console.log('query(_, true)', this._input)
        console.log('queryAll(_, true)', this._inputs)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const demo = document.getElementById('demo') as DemoComponent
    demo.debug()
})
