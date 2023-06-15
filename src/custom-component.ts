import { ComponentRegistry } from './component-registry';

export class CustomComponent extends HTMLElement {
    static elementName: string;
    static styles?: string;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        this.shadowRoot.append(...this.dom);
    }

    get template() {
        const constructor = Object.getPrototypeOf(this).constructor;
        return ComponentRegistry.templates[constructor.elementName];
    }

    get dom() {
        const parser = new DOMParser();
        const content = parser.parseFromString(this.render(), 'text/html');

        return content.body.children;
    }

    public static setDefaultTokens() {
        console.warn(
            'Default tokens are not set, consider implementing this feature.'
        );
    }

    public render(): string {
        throw new Error('Not implemented!');
    }
}
