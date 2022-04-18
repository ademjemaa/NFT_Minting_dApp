import { Address } from '@elrondnetwork/erdjs';
export declare class TransactionParameter {
    sender: Address;
    receiver: Address;
    functionName: string;
    inputParameters: string[];
    outputParameters: string[];
    constructor(sender: Address, receiver: Address, functionName: string, inputParameters: string[], outputParameters: string[]);
}
