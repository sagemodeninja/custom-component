import 'reflect-metadata'

const METADATA_KEY = 'component:attributes'

export class AttributeMachine {
    public static register(target: any, attribute: string) {
        const attributes = this.get(target.constructor)
        const metadata = [...attributes, attribute]

        Reflect.defineMetadata(
            METADATA_KEY,
            metadata,
            target.constructor
        )
    }

    public static get(target: any) {
        const metadata = Reflect.getMetadata(METADATA_KEY, target)
        return metadata ?? []
    }
}