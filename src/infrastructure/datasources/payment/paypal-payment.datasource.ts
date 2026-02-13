import type { PaymentPort } from "@/domain/ports/payment/payment.port";

// Ejemplo de canal de pago PayPal
export class PaypalPaymentDatasource implements PaymentPort {
  async processPayment(amount: number, currency: string): Promise<void> {
    // Aquí iría la integración real con PayPal
    console.log(`[PAYPAL] Processing payment: ${amount} ${currency}`);
  }
}
