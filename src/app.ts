import { customComponent, state, CustomComponent, query } from './';

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

    @state()
    public color: string;

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

    protected override onStateChanged(prop: string, _: any, value: any) {
        switch (prop) {
            case 'color': this._textSpan.style.color = value;
        }
    }
}
