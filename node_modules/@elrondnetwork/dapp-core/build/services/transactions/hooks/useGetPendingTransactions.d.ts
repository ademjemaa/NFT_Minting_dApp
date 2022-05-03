import { SignedTransactionsType, SignedTransactionsBodyType } from 'types/transactions';
interface useGetPendingTransactionsReturnType {
    pendingTransactions: SignedTransactionsType;
    pendingTransactionsArray: [string, SignedTransactionsBodyType][];
    hasPendingTransactions: boolean;
}
export declare function useGetPendingTransactions(): useGetPendingTransactionsReturnType;
export {};
