import { BalanceBuilder, IApiProvider, IProvider, SystemWrapper } from ".";
import { TestWallet } from "./testutils";
declare type InteractivePackage = {
    erdSys: SystemWrapper;
    Egld: BalanceBuilder;
    wallets: Record<string, TestWallet>;
};
export declare function setupInteractive(providerChoice: string): Promise<InteractivePackage>;
export declare function setupInteractiveWithProvider(provider: IProvider): Promise<InteractivePackage>;
export declare function chooseProxyProvider(providerChoice: string): IProvider;
export declare function chooseApiProvider(providerChoice: string): IApiProvider;
export {};
