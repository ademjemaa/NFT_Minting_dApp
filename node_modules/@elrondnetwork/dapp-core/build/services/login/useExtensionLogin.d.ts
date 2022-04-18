import { LoginHookGenericStateType, InitiateLoginFunctionType } from '../types';
interface UseExtensionLoginPropsType {
    callbackRoute: string;
    token?: string;
    redirectAfterLogin?: boolean;
}
export declare type UseExtensionLoginReturnType = [InitiateLoginFunctionType, LoginHookGenericStateType];
export declare const useExtensionLogin: ({ callbackRoute, token, redirectAfterLogin }: UseExtensionLoginPropsType) => UseExtensionLoginReturnType;
export {};
