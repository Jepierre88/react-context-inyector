// Domain
import type { GetAllAgentsUseCase } from "@/domain/usecases/agents/get-all-agents.usecase";
import type { GetAgentByIdUseCase } from "@/domain/usecases/agents/get-agent-by-id.usecase";
import type { ProcessPaymentUseCase } from "@/domain/usecases/payment/process-payment.usecase";
import type { PaymentPort } from "@/domain/ports/payment/payment.port";

// Infrastructure
import type { AgentsDatasource } from "@/infrastructure/datasources/agents/agents.datasource";
import type { AgentsRepositoryImp } from "@/infrastructure/repositories/agents/agents.repository-imp";
import type { PaymentRepositoryImp } from "@/infrastructure/repositories/payment/payment.repository-imp";

export interface DIContainerCradle {
  // Agents
  agentsDatasource: AgentsDatasource;
  agentsRepository: AgentsRepositoryImp;
  getAllAgentsUseCase: GetAllAgentsUseCase;
  getAgentByIdUseCase: GetAgentByIdUseCase;

  // Payment
  paymentDatasource: PaymentPort;
  paymentRepository: PaymentRepositoryImp;
  processPaymentUseCase: ProcessPaymentUseCase;
}
