import { CustomComponent } from '..';

export function customComponent(name: string) {
    return function <T extends { new(...args: any[]): CustomComponent }>(constructor: T) {
        if (!customElements.get(name)) {
            window.customElements.define(name, constructor);
        }
    }
}