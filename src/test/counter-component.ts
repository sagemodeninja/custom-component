import { CustomComponent } from '@/custom-component'
import {
    customComponent,
    query,
    property,
    state
} from '@/attributes'

@customComponent('counter-component')
export class CounterComponent extends CustomComponent {
    static styles = `
        span {
            color: red;
        }

        ::slotted(p) {
            color: green;
        }
    `

    @state()
    private _counter: number = 0

    @query('.control')
    private _control: HTMLSpanElement

    @property({ attribute: 'foreground-color' })
    public color: string

    @property()
    public size: number

    @property()
    public bold: boolean

    public render(): string {
        return `
            <span class="control" part="control"></span>
        `
    }

    protected override stateHasChanged(changes: Map<string, any>) {
        if (changes.has('_counter')) {
            this._control.innerText = `Clicked ${this._counter} times`
        }

        Object.assign(this._control.style, {
            color: this.color,
            fontWeight: this.bold ? 'bold' : 'normal',
            fontSize: `${this.size}px`
        })
    }

    public increment() {
        this._counter += 1
    }

    public decrement() {
        this._counter -= 1
    }
}