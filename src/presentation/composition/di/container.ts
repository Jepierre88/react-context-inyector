import {
  createContainer,
  asClass,
  asFunction,
  type AwilixContainer,
} from "awilix";

// Domain
import { GetAllAgentsUseCase } from "@/domain/usecases/get-all-agents.usecase";
import { GetAgentByIdUseCase } from "@/domain/usecases/get-agent-by-id.usecase";
import { GetAllUsersUseCase } from "@/domain/usecases/get-all-users.usecase";
import { ProcessPaymentUseCase } from "@/domain/usecases/payment/process-payment.usecase";
import type { PaymentPort } from "@/domain/ports/payment/payment.port";

// Infrastructure
import { AgentsDatasource } from "@/infrastructure/datasources/agents.datasource";
import { AgentsRepositoryImp } from "@/infrastructure/repositories/agents.repository-imp";
import { UserDatasource } from "@/infrastructure/datasources/user.datasource";
import { UserRepositoryImp } from "@/infrastructure/repositories/user.repository-imp";
import { PaymentRepositoryImp } from "@/infrastructure/repositories/payment/payment.repository-imp";
import {
  createPaymentDatasource,
  type PaymentChannel,
} from "@/infrastructure/datasources/payment/payment-datasource.factory";

export interface DIContainerCradle {
  // Agents
  agentsDatasource: AgentsDatasource;
  agentsRepository: AgentsRepositoryImp;
  getAllAgentsUseCase: GetAllAgentsUseCase;
  getAgentByIdUseCase: GetAgentByIdUseCase;

  // Users
  userDatasource: UserDatasource;
  userRepository: UserRepositoryImp;
  getAllUsersUseCase: GetAllUsersUseCase;

  // Payment
  paymentDatasource: PaymentPort;
  paymentRepository: PaymentRepositoryImp;
  processPaymentUseCase: ProcessPaymentUseCase;
}

export function createDIContainer(): AwilixContainer<DIContainerCradle> {
  const container = createContainer<DIContainerCradle>();

  container.register({
    // ── Agents ──
    agentsDatasource: asClass(AgentsDatasource).singleton(),
    agentsRepository: asFunction(
      ({ agentsDatasource }: DIContainerCradle) =>
        new AgentsRepositoryImp(agentsDatasource)
    ).singleton(),
    getAllAgentsUseCase: asFunction(
      ({ agentsRepository }: DIContainerCradle) =>
        new GetAllAgentsUseCase(agentsRepository)
    ).singleton(),
    getAgentByIdUseCase: asFunction(
      ({ agentsRepository }: DIContainerCradle) =>
        new GetAgentByIdUseCase(agentsRepository)
    ).singleton(),

    // ── Users ──
    userDatasource: asClass(UserDatasource).singleton(),
    userRepository: asFunction(
      ({ userDatasource }: DIContainerCradle) =>
        new UserRepositoryImp(userDatasource)
    ).singleton(),
    getAllUsersUseCase: asFunction(
      ({ userRepository }: DIContainerCradle) =>
        new GetAllUsersUseCase(userRepository)
    ).singleton(),

    // ── Payment (default channel: card) ──
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
