import { Type, TypedValue } from "./types";
export declare class ArrayVecType extends Type {
    readonly length: number;
    constructor(length: number, typeParameter: Type);
}
export declare class ArrayVec extends TypedValue {
    private readonly backingCollection;
    constructor(type: ArrayVecType, items: TypedValue[]);
    getLength(): number;
    getItems(): ReadonlyArray<TypedValue>;
    valueOf(): any[];
    equals(other: ArrayVec): boolean;
}
