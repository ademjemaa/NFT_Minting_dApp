export declare function refreshAccount(): Promise<{
    balance: string;
    address: string;
    nonce: number;
} | null | undefined>;
