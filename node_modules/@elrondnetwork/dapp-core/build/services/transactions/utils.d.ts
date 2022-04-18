import { Transaction } from '@elrondnetwork/erdjs/out';
import BigNumber from 'bignumber.js';
export declare function calcTotalFee(transactions: Transaction[], minGasLimit: number): BigNumber;
