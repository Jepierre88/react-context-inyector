export interface PaymentGatewayPort {
    processPayment(amount: number): Promise<boolean>;
}
