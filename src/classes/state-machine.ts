import 'reflect-metadata'
import { ObservedProperty } from '@/classes'

export class StateMachine {
    public static get(prop: ObservedProperty, target: any) {
        const value = target[prop.field]

        if (value && typeof value === 'object') {
            return this.createProxy(value, (prop: any, oldValue: any) => {
                if (!Array.isArray(oldValue) || prop === 'length') {
                    target.notifyStateHasChanged(prop.key, oldValue)
                }
            })
        }

        return value
    }

    public static parse(target: any, key: any, value: any) {
        const property = ObservedProperty.get(target, key)

        const type = property.getType(target)
        const converter = property.converter

        const parsed = converter.from(value, type)
        this.set(property, target, parsed)
    }

    public static set(prop: ObservedProperty, target: any, value: any) {
        const oldValue = target[prop.field]

        if (value !== oldValue) {
            target[prop.field] = value
            target.notifyStateHasChanged(prop.key, oldValue)
        }
    }

    private static createProxy(target: object, callback: (prop: any, oldValue: any) => void) {
        return new Proxy(target, {
            set(target, prop, value) {
                callback(prop, target)
                return Reflect.set(target, prop, value)
            }
        })
    }
}