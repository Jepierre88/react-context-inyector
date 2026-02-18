import { createContext } from "react";
import type { DIContextValue } from "./di-providers";

const DIContext = createContext<DIContextValue | undefined>(undefined);

export default DIContext;