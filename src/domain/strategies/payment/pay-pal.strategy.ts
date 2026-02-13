import type { PaymentGatewayPort } from "@/domain/ports/payment/payment-gateway.port";

export class PayPalStrategy implements PaymentGatewayPort {
    async processPayment(amount: number): Promise<boolean> {
        console.log(`Processing payment of $${amount} through PayPal...`);
        // Simulate payment processing logic here
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Payment processed successfully through PayPal.");
                resolve(true);
            }, 1000);
        });
    }
}