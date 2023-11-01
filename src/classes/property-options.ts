import { IAttributeConverter } from '../interfaces';

export class PropertyOptions {
    public attribute?: string | boolean;
    public converter?: IAttributeConverter;
}