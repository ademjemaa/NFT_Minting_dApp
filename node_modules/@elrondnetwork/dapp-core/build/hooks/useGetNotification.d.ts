export declare function useGetNotification(): {
    notification: import("../redux/slices").NotificationModal | undefined;
    clearNotification: () => {
        payload: undefined;
        type: string;
    };
};
