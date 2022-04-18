interface useGetActiveTransactionsStatusReturnType {
    pending: boolean;
    timedOut: boolean;
    fail: boolean;
    success: boolean;
    completed: boolean;
    hasActiveTransactions: boolean;
}
export declare function useGetActiveTransactionsStatus(): useGetActiveTransactionsStatusReturnType;
export {};
