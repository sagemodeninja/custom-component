import { CustomComponent } from '@sagemodeninja/custom-component';
import 'reflect-metadata';

export const OBSERVED_STATES = Symbol('observed_states');

export function customComponent(name: string) {
    return function <T extends { new(...args: any[]): CustomComponent }>(constructor: T) {
        window.customElements.define(name, constructor);
    }
}

export function state() {
    return function (target: any, key: string) {
        const privateKey = `_${key}`;
        const classPrototype = target.constructor;
        const stateProperties = Reflect.getMetadata(OBSERVED_STATES, classPrototype) || [];

        // Getters and setters
        const get = function () {
            return this[privateKey];
        }

        const set = function (value: any) {
            const oldValue = this[privateKey];

            if (value === oldValue) return;

            this[privateKey] = value;

            if (this.onStateChanged) {
                this.onStateChanged(key, oldValue, value);
            }
        }

        // Register as observed attribute
        stateProperties.push(key);
        Reflect.defineMetadata(OBSERVED_STATES, stateProperties, classPrototype);

        // Public property
        Object.defineProperty(target, key, {
            get,
            set,
            enumerable: true,
            configurable: true,
        });
    }
}

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