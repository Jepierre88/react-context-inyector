import { useCallback, useMemo, useState, type ReactNode } from "react"
import { LoadingContext } from "./loading.context"

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({})

    const setLoading = useCallback((id: string, state: boolean) => {
        setLoadingMap(prev => {
            if (!state && !prev[id]) return prev
            if (state && prev[id]) return prev

            const next = { ...prev }
            if (state) {
                next[id] = true
            } else {
                delete next[id]
            }
            return next
        })
    }, [])

    const getLoadingState = useCallback((id: string): boolean => {
        return !!loadingMap[id]
    }, [loadingMap])

    const isAnyLoading = useCallback((): boolean => {
        return Object.keys(loadingMap).length > 0
    }, [loadingMap])

    const value = useMemo(() => ({
        setLoading,
        getLoadingState,
        isAnyLoading
    }), [setLoading, getLoadingState, isAnyLoading])

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}
