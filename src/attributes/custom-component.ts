import { CustomComponent } from '..';

export function customComponent(name: string) {
    return function <T extends { new(...args: any[]): CustomComponent }>(constructor: T) {
        window.customElements.define(name, constructor);
    }
}