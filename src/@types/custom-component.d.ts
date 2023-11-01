declare module '@sagemodeninja/custom-component' {
    type Constructor = new (...args: any[]) => HTMLElement;

    export function customComponent(name: string): (constructor: Constructor) => void;

    export function state(): (target: any, key: string) => void;

    export function query(selector: string): (target: any, key: string) => void;

    export class CustomComponent extends HTMLElement {
        /**
         * Style
         */
        static styles?: string;
        /**
         * Returns the DOM string for this component.
         */
        render(): string;
    }
}
