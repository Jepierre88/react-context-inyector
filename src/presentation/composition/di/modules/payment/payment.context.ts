import { createContext } from "react";
import type { ProcessPaymentUseCase } from "@/domain/usecases/payment/process-payment.usecase";
import type { PaymentChannel } from "@/infrastructure/datasources/payment/payment-datasource.factory";

export type PaymentDiContextValue = {
    processPaymentUseCase: ProcessPaymentUseCase;
    channel: PaymentChannel;
    setChannel: (channel: PaymentChannel) => void;
};

export const PaymentDiContext = createContext<PaymentDiContextValue | undefined>(
    undefined
);