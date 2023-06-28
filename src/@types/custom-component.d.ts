declare module '@sagemodeninja/custom-component' {
    type Constructor = new (...args: any[]) => HTMLElement;

    export function customComponent(
        name: string
    ): (constructor: Constructor) => void;

    export class CustomComponent extends HTMLElement {
        /**
         * Style
         */
        static styles?: string;
        // connectedCallback(): void;
        /**
         * Returns the DOM string for this component.
         */
        render(): string;
    }
}
