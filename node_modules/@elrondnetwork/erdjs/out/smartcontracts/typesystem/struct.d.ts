import { FieldDefinition, Field } from "./fields";
import { CustomType, TypedValue } from "./types";
export declare class StructType extends CustomType {
    private readonly fieldsDefinitions;
    constructor(name: string, fieldsDefinitions: FieldDefinition[]);
    static fromJSON(json: {
        name: string;
        fields: any[];
    }): StructType;
    getFieldsDefinitions(): FieldDefinition[];
}
export declare class Struct extends TypedValue {
    private readonly fields;
    /**
     * Currently, one can only set fields at initialization time. Construction will be improved at a later time.
     */
    constructor(type: StructType, fields: Field[]);
    private checkTyping;
    getFields(): ReadonlyArray<Field>;
    valueOf(): any;
    equals(other: Struct): boolean;
}
