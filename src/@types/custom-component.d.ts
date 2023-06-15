declare module '@sagemodeninja/custom-component' {
    export class ComponentRegistry {
        static createRegistry(): ComponentRegistry;
        register(...component: (typeof CustomComponent)[]): void;
    }

    export class CustomComponent extends HTMLElement {
        static elementName: string;
        static styles?: string;
        get template(): HTMLTemplateElement;
        get dom(): HTMLCollection;
        /**
         * Apply default design tokens.
         */
        setDefaultTokens(): void;
        /**
         * Returns the DOM string for this component.
         */
        render(): string;
    }
}
