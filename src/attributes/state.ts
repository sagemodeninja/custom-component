import 'reflect-metadata';
import { PropertyOptions, defaultConverter } from '../classes';

export const OBSERVED_PROPERTIES = Symbol('observed_properties');

export function property(options?: PropertyOptions) {
    options ??= new PropertyOptions();

    return function (target: any, key: string) {
        const privateKey = `_${key}`;
        const converter = options.converter ?? defaultConverter;

        // Accessors
        const get = function () {
            const type = Reflect.getMetadata('design:type', this, key);
            const value = converter.from(this[privateKey], type);

            if (typeof value === 'object') {
                return createProxy(this, key, value);
            }

            return value;
        }

        const set = function (value: any) {
            const oldValue = this[key];

            if (value !== oldValue) {
                const type = Reflect.getMetadata('design:type', this, key);

                this[privateKey] = converter.to(value, type);
                this.notifyStateHasChanged(key, oldValue);
            }
        }

        Object.defineProperty(target, key, {
            get,
            set,
            enumerable: true,
            configurable: true,
        });

        // Observed attributes
        if (options.attribute ?? true) {
            const classPrototype = target.constructor;
            const observedProperties = Reflect.getMetadata(OBSERVED_PROPERTIES, classPrototype) ?? {};

            const attribute = options.attribute ?? key;
            const metadata = { ...observedProperties, [attribute.toString()]: key }

            Reflect.defineMetadata(OBSERVED_PROPERTIES, metadata, classPrototype);
        }
    }
}

export function state() {
    return property({ attribute: false });
}

function createProxy(instance: any, key: string, value: object) {
    return new Proxy(value, {
        set(target, prop, value) {
            target[prop] = value;

            if (!Array.isArray(value) || prop === 'length') {
                instance.notifyStateHasChanged(key, value);
            }

            return true;
        }
    })
}