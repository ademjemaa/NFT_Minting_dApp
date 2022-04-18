import { LoginHookGenericStateType, InitiateLoginFunctionType } from '../types';
interface UseWebWalletLoginPropsType {
    callbackRoute: string;
    token?: string;
}
export declare type UseWebWalletLoginReturnType = [InitiateLoginFunctionType, LoginHookGenericStateType];
export declare const useWebWalletLogin: ({ callbackRoute, token }: UseWebWalletLoginPropsType) => UseWebWalletLoginReturnType;
export default useWebWalletLogin;
