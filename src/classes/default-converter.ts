import { IAttributeConverter } from '../interfaces';

export class DefaultConverter implements IAttributeConverter {
    from(value: string, type: any) {
        if (!value)
            return undefined;

        switch (type.name) {
            case 'String':
            case 'Number':
                return type(value);
            case 'Boolean':
                return value && value.toLowerCase() === 'true';
            case 'Array':
            default:
                return JSON.parse(value);
        }
    }

    to(value: any) {
        return typeof value === 'object'
            ? value && JSON.stringify(value)
            : value.toString();
    }
}

export const defaultConverter = new DefaultConverter();