export type TPurchase = {
    id: number;
    managerId: number;
    managerName: string;
    purchaseDate: string; //YYYY-MM-DD
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    deduction: number;
    paymentAmount: number;
    remarks?: string;
}