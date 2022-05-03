import { SignedTransactionsType, SignedTransactionsBodyType } from 'types/transactions';
interface useGetSuccessfulTransactionsReturnType {
    successfulTransactions: SignedTransactionsType;
    successfulTransactionsArray: [string, SignedTransactionsBodyType][];
    hasSuccessfulTransactions: boolean;
}
export declare function useGetSuccessfulTransactions(): useGetSuccessfulTransactionsReturnType;
export {};
