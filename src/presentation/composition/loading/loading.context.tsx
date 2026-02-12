import { createContext } from "react"

type LoadingContextType = {
    setLoading: (id: string, state: boolean) => void
    getLoadingState: (id: string) => boolean
    isAnyLoading: () => boolean
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined)
