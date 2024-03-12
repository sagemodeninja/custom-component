import {
    defaultConverter,
    PropertyOptions
} from '@/classes'

const METADATA_KEY = 'component:properties'

export class ObservedProperty {
    private readonly _key: string
    private readonly _options: PropertyOptions

    constructor(key: string, options: PropertyOptions) {
        this._key = key
        this._options = options
    }

    public get key() {
        return this._key
    }

    public get field() {
        return `_${this._key}`
    }

    public get attribute() {
        const attribute = this._options.attribute
        return (attribute && typeof (attribute) !== 'boolean') ? attribute : this._key
    }

    public get converter() {
        return this._options.converter ?? defaultConverter
    }

    public getType(target: any) {
        return Reflect.getMetadata('design:type', target, this._key)
    }

    public static register(target: any, property: ObservedProperty) {
        Reflect.defineMetadata(
            METADATA_KEY,
            property,
            target.constructor,
            property.attribute
        )
    }

    public static get(target: any, key: string) {
        return Reflect.getMetadata(
            METADATA_KEY,
            target.constructor,
            key
        ) as ObservedProperty
    }
}