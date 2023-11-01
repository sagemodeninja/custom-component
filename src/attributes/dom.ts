export function query<T extends HTMLElement>(selector: string) {
    return function (target: any, key: string) {
        // Public property
        Object.defineProperty(target, key, {
            get: function (): T | null {
                return this.shadowRoot.querySelector(selector) as T | null;
            },
            enumerable: true,
            configurable: true,
        });
    }
}