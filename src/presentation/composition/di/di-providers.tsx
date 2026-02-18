import { useMemo, useState, type PropsWithChildren } from "react";
import type { AwilixContainer } from "awilix";
import {
  createDIContainer,
  type DIContainerCradle,
  createPaymentScope
} from "@/core/container/container";
import type { PaymentChannel } from "@/infrastructure/datasources/payment/payment-datasource.factory";
import DIContext from "./di.context";

export interface DIContextValue {
  container: AwilixContainer<DIContainerCradle>;
  channel: PaymentChannel;
  setChannel: (channel: PaymentChannel) => void;
}


export default function DiProviders({ children }: PropsWithChildren) {
  const [baseContainer] = useState(() => createDIContainer());
  const [channel, setChannel] = useState<PaymentChannel>("card");

  const scopedContainer = useMemo(
    () => createPaymentScope(baseContainer, channel),
    [baseContainer, channel]
  );

  const value = useMemo<DIContextValue>(
    () => ({ container: scopedContainer, channel, setChannel }),
    [scopedContainer, channel]
  );

  return <DIContext.Provider value={value}>{children}</DIContext.Provider>;
}