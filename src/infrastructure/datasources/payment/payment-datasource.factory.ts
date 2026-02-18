import type { PaymentPort } from "@/domain/ports/payment/payment.port";
import { CardPaymentDatasource } from "./card-payment.datasource";
import { PaypalPaymentDatasource } from "./paypal-payment.datasource";

export type PaymentChannel = "card" | "paypal";

export function createPaymentDatasource(channel: PaymentChannel): PaymentPort {
  const datasources: Record<PaymentChannel, PaymentPort> = {
    card: new CardPaymentDatasource(),
    paypal: new PaypalPaymentDatasource(),
  };

  return datasources[channel];
}
