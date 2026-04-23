import Navbar from '../component/nav';
import InvoiceList from '../component/invoiceList';
import Form from '../component/form';
import Drawer from '../component/drawer';
import { useState } from 'react';
import { fetchRecords, type Record } from '../schema/db';

export interface IHomePageProps {
    open: boolean;
    isOpen: (p: boolean) => void
}
const it: Record[] = fetchRecords()
export default function HomePage(props: IHomePageProps) {
    const { isOpen, open } = props
    const [invoices, setInvoices] = useState<Record[]>(it)

    return (
        <div>
            <Navbar onClick={() => isOpen(true)} setInvoice={setInvoices} />
            <InvoiceList invoices={invoices} />
            <Drawer isOpen={open} onClose={() => isOpen(false)}>
                <Form onClose={() => isOpen(false)} />
            </Drawer>
        </div>
    );
}
