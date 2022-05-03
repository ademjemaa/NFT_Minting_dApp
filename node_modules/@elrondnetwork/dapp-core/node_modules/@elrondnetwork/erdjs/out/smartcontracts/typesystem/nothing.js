"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NothingValue = exports.NothingType = void 0;
const types_1 = require("./types");
class NothingType extends types_1.PrimitiveType {
    constructor() {
        super("nothing");
    }
}
exports.NothingType = NothingType;
class NothingValue extends types_1.PrimitiveValue {
    constructor() {
        super(new NothingType());
    }
    equals(_other) {
        return false;
    }
    valueOf() {
        return {};
    }
}
exports.NothingValue = NothingValue;
//# sourceMappingURL=nothing.js.map