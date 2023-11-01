export interface IAttributeConverter {
    from(value: string, type: any): any;
    to(value: any, type: any): string;
}