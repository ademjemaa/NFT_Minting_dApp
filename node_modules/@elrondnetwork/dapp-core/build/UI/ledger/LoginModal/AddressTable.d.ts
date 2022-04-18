/// <reference types="react" />
interface AddressTablePropsType {
    loading: boolean;
    accounts: string[];
    startIndex: number;
    selectedAddress?: string;
    className: string;
    shouldRenderDefaultCss: boolean;
    onSelectAddress: (address: {
        address: string;
        index: number;
    } | null) => void;
    onGoToPrevPage: () => void;
    onGoToNextPage: () => void;
    onConfirmSelectedAddress: () => void;
}
declare const AddressTable: ({ loading, accounts, startIndex, selectedAddress, onGoToPrevPage, onGoToNextPage, onConfirmSelectedAddress, onSelectAddress, shouldRenderDefaultCss, className }: AddressTablePropsType) => JSX.Element;
export default AddressTable;
