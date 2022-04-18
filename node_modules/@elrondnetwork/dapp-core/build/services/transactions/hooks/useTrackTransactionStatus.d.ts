import { TransactionBatchStatusesEnum } from 'types/enums';
export interface UseTrackTransactionStatusArgsType {
    transactionId: string | null;
    onSuccess?: (transactionId: string | null) => void;
    onFail?: (transactionId: string | null, errorMessage?: string) => void;
    onTimedOut?: (transactionId: string | null) => void;
    onCancelled?: (transactionId: string | null) => void;
    onCompleted?: (transactionId: string | null) => void;
}
export declare function useTrackTransactionStatus({ transactionId, onSuccess, onFail, onCancelled, onTimedOut, onCompleted }: UseTrackTransactionStatusArgsType): {
    errorMessage?: undefined;
    isPending?: undefined;
    isSuccessful?: undefined;
    isFailed?: undefined;
    isCancelled?: undefined;
    isCompleted?: undefined;
    status?: undefined;
    transactions?: undefined;
} | {
    errorMessage: string;
    isPending?: undefined;
    isSuccessful?: undefined;
    isFailed?: undefined;
    isCancelled?: undefined;
    isCompleted?: undefined;
    status?: undefined;
    transactions?: undefined;
} | {
    isPending: boolean;
    isSuccessful: boolean;
    isFailed: boolean;
    isCancelled: boolean;
    isCompleted: boolean;
    errorMessage: string | undefined;
    status: TransactionBatchStatusesEnum | undefined;
    transactions: import("../../..").SignedTransactionType[] | undefined;
};
export default useTrackTransactionStatus;
