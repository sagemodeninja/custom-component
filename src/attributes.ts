type Constructor = new (...args: any[]) => HTMLElement;

export interface IAttributeChangeHandler {
    parameter: string;
    attribute: string;
}

export function customComponent(name: string) {
    return function (constructor: Constructor) {
        window.customElements.define(name, constructor);
    };
}

export function parameter(name?: string) {
    return function (target: any, key: string) {
        let value = target[key];

        const getter = function () {
            return value;
        };

        const setter = function (newValue: any) {
            const oldValue = value;

            value = newValue;

            if (newValue != oldValue) {
                this.setAttribute(name ?? key, value);
                this.stateHasChanged();
            }
        };

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });

        target.observeAttribute(key, name ?? key);
    };
}
