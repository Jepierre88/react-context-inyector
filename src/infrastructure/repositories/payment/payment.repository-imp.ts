import type { PaymentPort } from "@/domain/ports/payment/payment.port";

// El repositorio implementa el puerto del dominio,
// pero delega todo en un datasource que también cumple PaymentPort.
// Lo que cambia entre canales es el datasource, no el repositorio.
export class PaymentRepositoryImp implements PaymentPort {

    private paymentDatasource: PaymentPort;

    constructor(paymentDatasource: PaymentPort) {
        this.paymentDatasource = paymentDatasource;
    }
    
    async processPayment(amount: number, currency: string): Promise<void> {
        return this.paymentDatasource.processPayment(amount, currency);
    }
}