import { Type, CustomType } from "./types";
export declare class TypeMapper {
    private readonly openTypesFactories;
    private readonly closedTypesMap;
    constructor(customTypes?: CustomType[]);
    mapRecursiveType(type: Type): Type | null;
    mapType(type: Type): Type;
    feedCustomType(type: Type): void;
    private mapStructType;
    private mapEnumType;
    private mappedFields;
    private mapGenericType;
}
