import { useContext } from "react";

export default function useDi<T>(context: React.Context<T>) {
  const ctx = useContext(context);
  if (!ctx) {
    throw new Error(`useDi must be used within a ${context.displayName || "Context"} provider`);
  }
  return ctx;
};