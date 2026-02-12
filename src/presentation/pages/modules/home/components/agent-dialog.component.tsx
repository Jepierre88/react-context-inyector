import { useState } from "react"
import { Dialog, DialogContent } from "@/shared/components/ui/dialog"
import type { IAgent } from "../../../../../domain/entities/agents/agent.entity"
import { useLoading } from "@/presentation/composition/loading/use-loading"

type AgentCardComponentProps = {
    agent: IAgent | null
    isOpen: boolean
    onClose: () => void
}

function AgentDialogSkeleton() {
    return (
        <article className="animate-pulse">
            <section className="grid grid-cols-1 sm:grid-cols-5 gap-4 p-6">
                {/* Imagen skeleton */}
                <div className="sm:col-span-4 relative">
                    <div className="w-full h-80 bg-muted rounded-lg" />
                    <div className="absolute inset-0 bg-gradient-to-t from-muted/80 to-transparent rounded-lg" />
                    {/* Nombre skeleton */}
                    <div className="absolute bottom-4 left-4 space-y-2">
                        <div className="h-8 w-48 bg-muted-foreground/20 rounded" />
                        <div className="h-4 w-32 bg-muted-foreground/10 rounded" />
                    </div>
                </div>

                {/* Abilities skeleton */}
                <div className="sm:col-span-1 space-y-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="w-6 h-6 bg-muted rounded-full shrink-0" />
                            <div className="h-4 w-20 bg-muted rounded" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Descripción skeleton */}
            <div className="px-6 pb-6 space-y-2">
                <div className="h-3 w-full bg-muted rounded" />
                <div className="h-3 w-5/6 bg-muted rounded" />
                <div className="h-3 w-4/6 bg-muted rounded" />
            </div>
        </article>
    )
}

export default function AgentDialogComponent({
    agent,
    isOpen,
    onClose
}: AgentCardComponentProps) {
    const [imgLoaded, setImgLoaded] = useState(false)
    const { getLoadingState } = useLoading()

    const isLoading = getLoadingState("agentDetail")

    const getGradientStyle = (): React.CSSProperties => {
        if (!agent || !agent.backgroundGradientColors.length) return { background: "#6b7280" }

        const colors = agent.backgroundGradientColors.map(c => `#${c.slice(0, 6)}`)
        return {
            background: `linear-gradient(to right, ${colors.join(", ")})`
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-3xl p-0">
                {isLoading ? (
                    <AgentDialogSkeleton />
                ) : (
                <article className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <section className="overflow-clip grid grid-cols-1 sm:grid-cols-5 content-center items-center gap-4 p-6">

                        <div className="sm:col-span-4 relative z-10 h-80 sm:h-96">
                        <svg className="absolute inset-0 w-full h-full pointer-events-none select-none z-0" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                            <text
                                x="50%"
                                y="55%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="font-bebas uppercase fill-foreground opacity-10 dark:opacity-15"
                                style={{ fontSize: "2rem" }}
                            >
                                {agent?.displayName}
                            </text>
                        </svg>
                            {!imgLoaded && (
                                <div className="flex items-center justify-center h-full animate-pulse text-white rounded-lg" style={getGradientStyle()}>
                                    <span className="text-4xl font-bold opacity-70">
                                        {agent?.displayName?.charAt(0) ?? "?"}
                                    </span>
                                </div>
                            )}
                            <picture className={`${imgLoaded ? "" : "hidden"} block h-full`}>
                                <img
                                    src={agent?.fullPortrait}
                                    alt={agent?.displayName}
                                    className="w-full h-full object-contain"
                                    onLoad={() => setImgLoaded(true)}
                                />
                            </picture>
                        </div>
                        <article className="sm:col-span-1 relative z-10">
                            <div>
                                {
                                    agent?.abilities.map((ability, index) => (
                                        <div key={index} className="mb-4 flex items-center gap-4">
                                            <img
                                                src={ability.displayIcon}
                                                alt={ability.displayName}
                                                className="w-6 h-6 mb-2"
                                            />
                                            <h3 className="text-sm font-semibold mb-1">
                                                {ability.displayName}
                                            </h3>
                                        </div>
                                    ))
                                }
                            </div>
                        </article>
                    </section>
                    <p className="px-6 pb-6">
                        {agent?.description}
                    </p>
                </article>
                )}
            </DialogContent>
        </Dialog>
    )
}