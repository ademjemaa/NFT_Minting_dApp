/// <reference types="react" />
interface AddressRowType {
    selectedAddress?: string;
    index: number;
    address: string;
    onSelectAddress: (address: {
        address: string;
        index: number;
    } | null) => void;
}
declare const AddressRow: ({ address, index, selectedAddress, onSelectAddress }: AddressRowType) => JSX.Element;
export default AddressRow;
