import type React from "react";
import { UserDiProvider } from "./modules/user/user.provider";
import { AgentsDiProvider } from "./modules/agents/agents.provider";
import { PaymentDiProvider } from "./modules/payment/payment.provider";

export default function DiProviders({ children }: { children: React.ReactNode }) {
  return (
    <UserDiProvider>
      <AgentsDiProvider>
        <PaymentDiProvider>{children}</PaymentDiProvider>
      </AgentsDiProvider>
    </UserDiProvider>
  );
}