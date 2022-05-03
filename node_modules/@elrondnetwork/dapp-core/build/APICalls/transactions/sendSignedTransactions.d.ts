import { Transaction } from '@elrondnetwork/erdjs';
export declare type SendSignedTransactionsReturnType = string[];
export declare function sendSignedTransactions(signedTransactions: Transaction[]): Promise<SendSignedTransactionsReturnType>;
