import { useContext } from "react";
import { type DIContextValue } from "./di-providers";
import type { DIContainerCradle } from "./container";
import DIContext from "./di.context";

function useDIContext(): DIContextValue {
  const ctx = useContext(DIContext);
  if (!ctx) {
    throw new Error("useDi must be used within a DiProviders");
  }
  return ctx;
}

export default function useDi<K extends keyof DIContainerCradle>(
  name: K
): DIContainerCradle[K] {
  const { container } = useDIContext();
  return container.resolve(name);
}

export function usePaymentChannel() {
  const { channel, setChannel } = useDIContext();
  return { channel, setChannel };
};