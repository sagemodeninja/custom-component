import 'reflect-metadata';
import { OBSERVED_PROPERTIES } from './attributes';

export class CustomComponent extends HTMLElement {
    private static _templates: { [name: string]: HTMLTemplateElement } = {};

    public static styles?: string;

    public static get observedAttributes() {
        const properties = Reflect.getMetadata(OBSERVED_PROPERTIES, this);
        return properties ? Object.keys(properties) : [];
    }

    constructor() {
        super();

        const template = this.resolveTemplate();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.append(...this.virtualDOM);
    }

    get virtualDOM() {
        const parser = new DOMParser();
        const content = parser.parseFromString(this.render(), 'text/html');

        return content.body.children;
    }

    public render(): string {
        throw new Error('Not implemented!');
    }

    public attributeChangedCallback(name: string, _: any, value: any) {
        const properties = Reflect.getMetadata(OBSERVED_PROPERTIES, this.constructor);
        const key = properties[name];
        const oldValue = this[key];

        this[`_${key}`] = value;
        this.notifyStateHasChanged(key, oldValue);
    }

    protected stateHasChanged(property: string, oldValue: any, newValue: any) { }

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

    private notifyStateHasChanged(prop: string, oldValue: any) {
        this.stateHasChanged(prop, oldValue, this[prop]);
    }
}
