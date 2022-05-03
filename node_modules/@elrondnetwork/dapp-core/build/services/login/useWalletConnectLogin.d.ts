import { LoginHookGenericStateType } from '../types';
interface InitWalletConnectType {
    callbackRoute: string;
    logoutRoute: string;
    token?: string;
    shouldLoginUser?: boolean;
    redirectAfterLogin?: boolean;
}
export interface WalletConnectLoginHookCustomStateType {
    uriDeepLink: string | null;
    walletConnectUri?: string;
}
export declare type WalletConnectLoginHookReturnType = [(loginProvider?: boolean) => void, LoginHookGenericStateType, WalletConnectLoginHookCustomStateType];
export declare const useWalletConnectLogin: ({ callbackRoute, logoutRoute, token, redirectAfterLogin }: InitWalletConnectType) => WalletConnectLoginHookReturnType;
export default useWalletConnectLogin;
