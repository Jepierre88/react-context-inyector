import { asFunction, type AwilixContainer } from "awilix";
import { ProcessPaymentUseCase } from "@/domain/usecases/payment/process-payment.usecase";
import { PaymentRepositoryImp } from "@/infrastructure/repositories/payment/payment.repository-imp";
import {
  createPaymentDatasource,
  type PaymentChannel,
} from "@/infrastructure/datasources/payment/payment-datasource.factory";
import type { DIContainerCradle } from "../../container.types";

export const paymentModule = {
  paymentDatasource: asFunction(() =>
    createPaymentDatasource("card")
  ).scoped(),
  paymentRepository: asFunction(
    ({ paymentDatasource }: DIContainerCradle) =>
      new PaymentRepositoryImp(paymentDatasource)
  ).scoped(),
  processPaymentUseCase: asFunction(
    ({ paymentRepository }: DIContainerCradle) =>
      new ProcessPaymentUseCase(paymentRepository)
  ).scoped(),
};

/**
 * Creates a scoped container with the payment datasource
 * configured for the given channel. Scoped registrations
 * (paymentRepository, processPaymentUseCase) are re-resolved
 * within the new scope automatically.
 */
export function createPaymentScope(
  container: AwilixContainer<DIContainerCradle>,
  channel: PaymentChannel
): AwilixContainer<DIContainerCradle> {
  const scope = container.createScope<DIContainerCradle>();
  scope.register({
    paymentDatasource: asFunction(() =>
      createPaymentDatasource(channel)
    ).scoped(),
  });
  return scope;
}
