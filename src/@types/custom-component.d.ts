declare module '@sagemodeninja/custom-component' {
    type Constructor = new (...args: any[]) => HTMLElement;

    export interface IAttributeConverter {
        from(value: string, type: any): any;
        to(value: any, type: any): string;
    }

    export class CustomComponent extends HTMLElement {
        public static styles?: string;
        public render(): string;
        protected stateHasChanged(changes: Map<string, any>): void;
    }

    export class PropertyOptions {
        public attribute?: string | boolean;
        public converter?: IAttributeConverter;
    }

    export function customComponent(name: string): (constructor: Constructor) => void;

    export function property(options?: PropertyOptions): (target: any, key: string) => void;

    export function state(): (target: any, key: string) => void;

    export function query(selector: string, host?: boolean): (target: any, key: string) => void;

    export function queryAll(selector: string, host?: boolean): (target: any, key: string) => void;
}
