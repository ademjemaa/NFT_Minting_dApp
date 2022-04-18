import { Struct } from "./struct";
import { Field } from "./fields";
import { Type, TypedValue } from "./types";
import { StructType } from "./struct";
export declare class TupleType extends StructType {
    constructor(...typeParameters: Type[]);
    private static prepareName;
    private static prepareFieldDefinitions;
}
export declare class Tuple extends Struct {
    constructor(type: TupleType, fields: Field[]);
    static fromItems(items: TypedValue[]): Tuple;
}
