import { SignedTransactionsType, SignedTransactionsBodyType } from 'types/transactions';
interface useGetCompletedTransactionsReturnType {
    completedTransactions: SignedTransactionsType;
    completedTransactionsArray: [string, SignedTransactionsBodyType][];
    hasCompletedTransactions: boolean;
}
export declare function useGetCompletedTransactions(): useGetCompletedTransactionsReturnType;
export {};
