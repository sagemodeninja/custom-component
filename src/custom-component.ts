// import { IAttributeChangeHandler } from './attributes';

export abstract class CustomComponent extends HTMLElement {
    private static _templates: { [name: string]: HTMLTemplateElement } = {};

    // private _initialized: boolean;
    // private _firstRender: boolean;
    // private _stateDebouncer: number;
    // private _attributeChangeHandlers: IAttributeChangeHandler[] = [];

    public static styles?: string;

    constructor() {
        super();

        // this._initialized = false;
        // this._firstRender = true;

        this.attachShadow({ mode: 'open' });
        this.renderDOM();
    }

    // connectedCallback() {
    //     this._initialized = true;

    //     this.onParametersSet();
    //     this.renderDOM();
    // }

    // observeAttribute(parameter: string, attribute: string) {
    //     this._attributeChangeHandlers ??= [];
    //     this._attributeChangeHandlers.push({
    //         parameter,
    //         attribute,
    //     });
    // }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        // console.log(this._attributeChangeHandlers);
        // const handler = this._attributeChangeHandlers.find(
        //     h => h.attribute === name
        // );
        // if (handler && newValue !== this[handler.parameter]?.toString()) {
        //     this[handler.parameter] = newValue;
        // }
    }

    get virtualDOM() {
        const parser = new DOMParser();
        const content = parser.parseFromString(this.render(), 'text/html');

        return content.body.children;
    }

    // public stateHasChanged() {
    //     if (!this._initialized) return;

    //     if (this._stateDebouncer) {
    //         window.clearTimeout(this._stateDebouncer);
    //         this._stateDebouncer = null;
    //     }

    //     this._stateDebouncer = window.setTimeout(() => {
    //         this._stateDebouncer = null;

    //         this.onParametersSet();
    //         this.renderDOM();
    //     }, 50);
    // }

    protected abstract render(): string;

    // protected onParametersSet() {
    //     // Override on children.
    // }

    // protected onAfterRender(firstRender: boolean): void {
    //     // Override on children.
    // }

    private renderDOM() {
        const template = this.resolveTemplate();

        this.shadowRoot.innerHTML = null;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.append(...this.virtualDOM);

        // this.onAfterRender(this._firstRender);
        // this._firstRender = false;
    }

    private resolveTemplate() {
        const name = this.localName;

        if (name in CustomComponent._templates)
            return CustomComponent._templates[name];

        return this.createTemplate(name);
    }

    private createTemplate(name: string): HTMLTemplateElement {
        const template = document.createElement('template');
        const constructor = Object.getPrototypeOf(this).constructor;

        template.innerHTML = `<style>${constructor.styles ?? ''}</style>`;
        CustomComponent._templates[name] = template;

        return template;
    }
}
