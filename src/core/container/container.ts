import {
  createContainer,
  type AwilixContainer,
} from "awilix";

// Modules
import { agentsModule } from "./modules/agents/agents.module";
import { paymentModule } from "./modules/payment/payment.module";
import { userModule } from "./modules/user/user.module";
import type { DIContainerCradle } from "./container.types";

// Types
export type { DIContainerCradle } from "./container.types";

// Scopes
export { createPaymentScope } from "./modules/payment/payment.module";

export function createDIContainer(): AwilixContainer<DIContainerCradle> {
  const container = createContainer<DIContainerCradle>();

  container.register({
    ...agentsModule,
    ...userModule,
    ...paymentModule,
  });

  return container;
}
