import type { PaymentPort } from "@/domain/ports/payment/payment.port";
import { CardPaymentDatasource } from "./card-payment.datasource";
import { PaypalPaymentDatasource } from "./paypal-payment.datasource";

export type PaymentChannel = "card" | "paypal";

export function createPaymentDatasource(channel: PaymentChannel): PaymentPort {
  switch (channel) {
    case "card":
      return new CardPaymentDatasource();
    case "paypal":
      return new PaypalPaymentDatasource();
    default:
      throw new Error(`Unsupported payment channel: ${channel}`);
  }
}
