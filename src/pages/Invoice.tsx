import * as React from 'react';
import InvoiceDetails from '../component/invoiceDetail';

export interface IInvoiceProps {
    open: boolean;
    isOpen: () => void
}

export default function Invoice(props: IInvoiceProps) {
    const {isOpen } = props
    return (
        <div >
            <InvoiceDetails onClick={isOpen}/>
        </div>
    );
}
