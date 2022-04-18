import React from 'react';
export declare const DappCoreContext: React.Context<any>;
export declare const useStore: () => import("redux").Store<any, import("redux").AnyAction>;
export declare const useDispatch: () => import("redux").Dispatch<import("redux").AnyAction>;
export declare const useSelector: <Selected extends unknown>(selector: (state: any) => Selected, equalityFn?: ((previous: Selected, next: Selected) => boolean) | undefined) => Selected;
