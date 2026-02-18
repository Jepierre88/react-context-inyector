import { asFunction } from "awilix";
import { ProcessPaymentUseCase } from "@/domain/usecases/payment/process-payment.usecase";
import { PaymentRepositoryImp } from "@/infrastructure/repositories/payment/payment.repository-imp";
import { createPaymentDatasource } from "@/infrastructure/datasources/payment/payment-datasource.factory";
import type { DIContainerCradle } from "../../container";

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
