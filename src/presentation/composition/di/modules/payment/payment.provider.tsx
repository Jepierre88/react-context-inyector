import { useMemo, useState, type PropsWithChildren } from "react";
import { PaymentDiContext } from "./payment.context";
import { ProcessPaymentUseCase } from "@/domain/usecases/payment/process-payment.usecase";
import { PaymentRepositoryImp } from "@/infrastructure/repositories/payment/payment.repository-imp";
import {
	createPaymentDatasource,
	type PaymentChannel,
} from "@/infrastructure/datasources/payment/payment-datasource.factory";

export const PaymentDiProvider = ({ children }: PropsWithChildren) => {
	const [channel, setChannel] = useState<PaymentChannel>("card");

	const paymentDatasource = useMemo(
		() => createPaymentDatasource(channel),
		[channel]
	);

	const paymentRepository = useMemo(
		() => new PaymentRepositoryImp(paymentDatasource),
		[paymentDatasource]
	);

	const processPaymentUseCase = useMemo(
		() => new ProcessPaymentUseCase(paymentRepository),
		[paymentRepository]
	);

	const value = useMemo(
		() => ({ processPaymentUseCase, channel, setChannel }),
		[processPaymentUseCase, channel]
	);

	return (
		<PaymentDiContext.Provider value={value}>
			{children}
		</PaymentDiContext.Provider>
	);
};

