type Constructor = new (...args: any[]) => HTMLElement;

export function customComponent(name: string) {
    return function (constructor: Constructor) {
        window.customElements.define(name, constructor);
    };
}
