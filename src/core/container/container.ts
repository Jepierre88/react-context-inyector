import {
  createContainer,
  asFunction,
  type AwilixContainer,
} from "awilix";
import {
  createPaymentDatasource,
  type PaymentChannel,
} from "@/infrastructure/datasources/payment/payment-datasource.factory";

// Modules
import { agentsModule } from "./modules/agents/agents.module";
import { paymentModule } from "./modules/payment/payment.module";
import { userModule } from "./modules/user/user.module";
import type { DIContainerCradle } from "./container.types";

// Types
export type { DIContainerCradle } from "./container.types";

export function createDIContainer(): AwilixContainer<DIContainerCradle> {
  const container = createContainer<DIContainerCradle>();

  container.register({
    ...agentsModule,
    ...userModule,
    ...paymentModule,
  });

  return container;
}

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
