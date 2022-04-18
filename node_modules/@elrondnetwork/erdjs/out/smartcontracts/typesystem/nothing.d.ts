import { PrimitiveType, PrimitiveValue } from "./types";
export declare class NothingType extends PrimitiveType {
    constructor();
}
export declare class NothingValue extends PrimitiveValue {
    constructor();
    equals(_other: NothingValue): boolean;
    valueOf(): any;
}
