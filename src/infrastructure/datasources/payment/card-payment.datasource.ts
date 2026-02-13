import type { PaymentPort } from "@/domain/ports/payment/payment.port";

// Ejemplo de canal de pago con tarjeta
export class CardPaymentDatasource implements PaymentPort {
  async processPayment(amount: number, currency: string): Promise<void> {
    // Aquí iría la integración real con el gateway de tarjeta
    console.log(`[CARD] Processing payment: ${amount} ${currency}`);
  }
}
