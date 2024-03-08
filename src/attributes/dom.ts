export function query<T extends HTMLElement>(selector: string, host: boolean = false) {
    return function (target: any, key: string) {
        // Public property
        Object.defineProperty(target, key, {
            get: function (): T | null {
                const queryTarget = host ? this : this.shadowRoot
                return queryTarget.querySelector(selector) as T | null;
            },
            enumerable: true,
            configurable: true,
        });
    }
}

export function queryAll<T extends HTMLElement>(selector: string, host: boolean = false) {
    return function (target: any, key: string) {

        // Public property
        Object.defineProperty(target, key, {
            get: function (): T[] {
                const queryTarget = host ? this : this.shadowRoot
                const nodes = queryTarget.querySelectorAll(selector)

                return Array.from(nodes) as T[]
            },
            enumerable: true,
            configurable: true,
        });
    }
}