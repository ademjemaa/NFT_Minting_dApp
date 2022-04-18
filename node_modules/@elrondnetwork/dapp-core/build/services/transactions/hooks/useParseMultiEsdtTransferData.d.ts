import { Transaction } from '@elrondnetwork/erdjs';
import { MultiSignTxType, TxDataTokenType, TxsDataTokensType } from 'types/transactions';
interface UseParseMultiEsdtTransferDataPropsType {
    transactions?: Transaction[];
}
interface UseParseMultiEsdtTransferDataReturnType {
    parsedTransactionsByDataField: TxsDataTokensType;
    getTxInfoByDataField: (data: string, multiTransactionData?: string) => TxDataTokenType;
    allTransactions: MultiSignTxType[];
}
export declare function useParseMultiEsdtTransferData({ transactions }: UseParseMultiEsdtTransferDataPropsType): UseParseMultiEsdtTransferDataReturnType;
export {};
