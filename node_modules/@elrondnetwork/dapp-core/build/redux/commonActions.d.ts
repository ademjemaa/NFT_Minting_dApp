import { LoginMethodsEnum } from 'types/enums';
export interface LoginActionPayloadType {
    address: string;
    loginMethod: LoginMethodsEnum;
}
export declare const logoutAction: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"logout">;
export declare const loginAction: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[LoginActionPayloadType], LoginActionPayloadType, "login", never, never>;
