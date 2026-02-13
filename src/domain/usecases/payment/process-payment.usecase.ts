import { PaymentPort } from "@/domain/ports/payment/payment.port"

export class ProcessPaymentUseCase {

    private readonly paymentPort: PaymentPort

        constructor(paymentPort: PaymentPort) {
            this.paymentPort = paymentPort
        }

    async execute(amount: number, currency: string): Promise<void> {
        await this.paymentPort.processPayment(amount, currency)
    }
}