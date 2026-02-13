export abstract class PaymentPort {
    abstract processPayment(amount: number, currency: string): Promise<void>
}