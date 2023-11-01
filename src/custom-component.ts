import 'reflect-metadata';
import { OBSERVED_STATES } from './attributes';

export class CustomComponent extends HTMLElement {
    private static _templates: { [name: string]: HTMLTemplateElement } = {};

    public static styles?: string;

    public static get observedAttributes() {
        return Reflect.getMetadata(OBSERVED_STATES, this);
    }

    constructor() {
        super();

        const template = this.resolveTemplate();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.append(...this.virtualDOM);
    }

    public attributeChangedCallback(prop: string, _: any, value: any) {
        const type = Reflect.getMetadata("design:type", this, prop);
        this[prop] = type(value);
    }

    protected onStateChanged(property: string, oldValue: any, newValue: any) { }

    private resolveTemplate() {
        const name = this.constructor.name;

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

    get virtualDOM() {
        const parser = new DOMParser();
        const content = parser.parseFromString(this.render(), 'text/html');

        return content.body.children;
    }

    public render(): string {
        throw new Error('Not implemented!');
    }
}
