export interface OpenPayError {
    category: string;
    description: string;
    error_code: number;
}

export interface OpenPayCharge {
    id: string;
    amount: number;
    status: string;
}