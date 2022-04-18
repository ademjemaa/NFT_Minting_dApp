import React from 'react';
declare const ModalContainer: ({ children, noSpacer, className, title, onClose }: {
    children: React.ReactNode;
    noSpacer?: boolean | undefined;
    className?: string | undefined;
    title: React.ReactNode;
    onClose?: (() => void) | undefined;
}) => JSX.Element;
export default ModalContainer;
