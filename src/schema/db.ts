
const KEY = "invoices";

export type Record = {
    id: string;
    from_streetAddress: string;
    from_city: string;
    from_postcode: string;
    from_country: string;
    to_streetAddress: string;
    to_city: string;
    to_postcode: string;
    to_country: string;
    clientName: string;
    clientEmail: string;
    invoiceDate: any;
    projectDescription: string;
    paymentTerms: string;
    itemList: {
        itemName: string;
        qty: any;
        price:any;
    }[];
    status:"pending"|"draft"|"paid"
    amount:number
}


function getAll(): Record[] {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
}

function saveAll(records: Record[]): void {
    localStorage.setItem(KEY, JSON.stringify(records));
}


export function createRecord(data: Omit<Record, "id">): Record {
    const records = getAll();
    const newRecord = { ...data, id: crypto.randomUUID() };
    records.push(newRecord);
    saveAll(records);
    return newRecord;
}

export function fetchRecords(): Record[] {
    return getAll();
}

export function fetchRecord(id: any): Record | undefined {
    return getAll().find((r) => r.id === id);
}

export function updateRecord(id: any, updates: Partial<Record>): Record | null {
    const records = getAll();
    const index = records.findIndex((r) => r.id === id);

    if (index === -1) return null;

    records[index] = { ...records[index], ...updates }; // merge, don't replace
    saveAll(records);
    return records[index];
}

// DELETE
export function deleteRecord(id:any): boolean {
    const records = getAll();
    const filtered = records.filter((r) => r.id !== id);

    if (filtered.length === records.length) return false; // nothing was deleted

    saveAll(filtered);
    return true;
}

export function clearRecords(): void {
    localStorage.removeItem(KEY);
}