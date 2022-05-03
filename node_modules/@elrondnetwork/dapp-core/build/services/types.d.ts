export interface LoginHookGenericStateType {
    error: string;
    loginFailed: boolean;
    isLoading: boolean;
    isLoggedIn: boolean;
}
export declare type InitiateLoginFunctionType = () => void;
export declare type LoginHookReturnType = [LoginHookReturnType, LoginHookGenericStateType];
