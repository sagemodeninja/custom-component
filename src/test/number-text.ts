import {
    CustomComponent,
    customComponent,
    property,
    query,
    state
} from '@/index'

class Style {
    bold?: boolean
    color?: string
    size?: number
}

@customComponent('number-text')
export class NumberText extends CustomComponent {
    @query('.control')
    private _control: HTMLSpanElement

    @state()
    private _style: Style

    @property()
    public value: number

    public render() {
        return `<span class="control" part="control"></span>`
    }

    protected stateHasChanged(changes: Map<string, any>): void {
        changes.forEach((oldValue, change) => {
            if (change === 'value') {
                this._control.innerText = this.value ? this.value.toString() : '0'
            }
        })

        Object.assign(this._control.style, {
            color: this._style.color,
            fontWeight: this._style.bold ? 'bold' : 'normal',
            fontSize: `${this._style.size}px`
        })
    }

    public debug() {
        this._style ??= {}
        this._style.bold = true
        this._style.size = this.value * 2
        this._style.color = 'blue'
    }
}