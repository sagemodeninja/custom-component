import 'reflect-metadata'
import {
    PropertyOptions,
    defaultConverter,
    StateMachine,
    ObservedProperty,
    AttributeMachine
} from '@/classes';

export function property(options?: PropertyOptions) {
    options ??= new PropertyOptions();

    return function (target: any, key: string) {
        const property = new ObservedProperty(key, options)

        ObservedProperty.register(target, property)

        // Accessors
        const get = function () {
            return StateMachine.get(property, this)
        }

        const set = function (value: any) {
            StateMachine.set(property, this, value)

            // TODO: Refactor
            // Reflect attribute
            const attr = options.attribute

            if (typeof attr !== 'boolean' || attr) {
                const type = property.getType(this)

                if (type.name !== 'Boolean') {
                    const converter = options.converter ?? defaultConverter;
                    const attributeValue = converter.to(value, type)

                    this.setAttribute(property.attribute, attributeValue)
                } else {
                    this.toggleAttribute(property.attribute, value)
                }
            }
        }

        Object.defineProperty(target, key, {
            get,
            set,
            enumerable: true,
            configurable: true,
        })

        // Observed attributes
        if (options.attribute ?? true) {
            const attribute = options.attribute?.toString() ?? key
            AttributeMachine.register(target, attribute)
        }
    }
}

export function state() {
    return property({ attribute: false });
}