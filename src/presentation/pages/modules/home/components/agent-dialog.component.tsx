import { useState, type CSSProperties } from "react"
import { Dialog, DialogContent } from "@/shared/components/ui/dialog"
import { Badge } from "@/shared/components/ui/badge"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/shared/components/ui/accordion"
import type { IAgent } from "../../../../../domain/entities/agents/agent.entity"
import { useLoading } from "@/presentation/composition/loading/use-loading"
import type { Ability } from "@/domain/entities/agents/ability.entity"

const SLOT_LABELS: Record<string, string> = {
    Ability1: "C",
    Ability2: "Q",
    Grenade: "E",
    Ultimate: "X",
    Passive: "P",
}

type AgentCardComponentProps = {
    agent: IAgent | null
    isOpen: boolean
    onClose: () => void
}

function AgentDialogSkeleton() {
    return (
        <article className="animate-pulse">
            <section className="grid grid-cols-1 sm:grid-cols-5 gap-4 p-6">
                <div className="sm:col-span-4 relative">
                    <div className="w-full h-80 bg-muted rounded-lg" />
                    <div className="absolute inset-0 bg-linear-to-t from-muted/80 to-transparent rounded-lg" />
                    <div className="absolute bottom-4 left-4 space-y-2">
                        <div className="h-8 w-48 bg-muted-foreground/20 rounded" />
                        <div className="h-4 w-32 bg-muted-foreground/10 rounded" />
                    </div>
                </div>
                <div className="sm:col-span-1 space-y-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="w-6 h-6 bg-muted rounded-full shrink-0" />
                            <div className="h-4 w-20 bg-muted rounded" />
                        </div>
                    ))}
                </div>
            </section>
            <div className="px-6 pb-6 space-y-2">
                <div className="h-3 w-full bg-muted rounded" />
                <div className="h-3 w-5/6 bg-muted rounded" />
                <div className="h-3 w-4/6 bg-muted rounded" />
            </div>
        </article>
    )
}

function AbilityItem({ ability }: { ability: Ability }) {
    const slot = SLOT_LABELS[ability.slot] ?? ability.slot

    return (
        <AccordionItem value={ability.slot} className="border-border/50">
            <AccordionTrigger className="py-2 px-2 hover:no-underline hover:bg-muted/50 rounded-md transition-all">
                <div className="flex items-center gap-3">
                    <span className="font-bebas text-lg text-muted-foreground w-5 text-center shrink-0">
                        {slot}
                    </span>
                    {ability.displayIcon && (
                        <img
                            src={ability.displayIcon}
                            alt={ability.displayName}
                            className="w-6 h-6 shrink-0 dark:invert-0 invert"
                        />
                    )}
                    <h3 className="font-bebas text-sm tracking-wide uppercase truncate">
                        {ability.displayName}
                    </h3>
                </div>
            </AccordionTrigger>
            {ability.description && (
                <AccordionContent className="pl-8 text-xs text-muted-foreground leading-relaxed">
                    {ability.description}
                </AccordionContent>
            )}
        </AccordionItem>
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

    const getBorderStyle = (): CSSProperties => {
        if (!agent || !agent.backgroundGradientColors.length) return {}

        const color = `#${agent.backgroundGradientColors[0].slice(0, 6)}`
        return { borderColor: color }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-4xl p-0 border-2" style={getBorderStyle()}>
                {isLoading ? (
                    <AgentDialogSkeleton />
                ) : (
                <article className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {/* Header: Rol + Developer Name */}
                    <div className="flex items-center justify-between px-6 pt-6">
                        {agent?.role && (
                            <div className="flex items-center gap-2">
                                <img
                                    src={agent.role.displayIcon}
                                    alt={agent.role.displayName}
                                    className="w-5 h-5 dark:invert-0 invert"
                                />
                                <span className="font-bebas text-xl tracking-widest uppercase text-foreground">
                                    {agent.role.displayName}
                                </span>
                            </div>
                        )}
                        {agent?.developerName && (
                            <span className="font-mono text-xs text-muted-foreground tracking-wider uppercase opacity-50 mr-10">
                                // {agent.developerName}
                            </span>
                        )}
                    </div>

                    {/* Contenido principal */}
                    <section className="overflow-clip grid grid-cols-1 sm:grid-cols-5 content-center items-start gap-4 p-6">
                        {/* Imagen de detalle: solo fondo del agente + ilustración encima */}
                        <div className="sm:col-span-3 relative z-10 h-80 sm:h-96">
                            {/* Imagen de background invertida en modo claro, normal en modo oscuro */}
                            {agent?.background && (
                                <img
                                    src={agent.background}
                                    alt={agent.displayName}
                                    className="absolute inset-0 -z-10 w-full h-full object-cover opacity-80 invert dark:invert-0"
                                />
                            )}
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
                            {/* Placeholder mientras carga la ilustración */}
							{!imgLoaded && (
								<div className="flex items-center justify-center h-full animate-pulse text-white rounded-lg bg-black/40">
									<span className="text-4xl font-bold opacity-70">
										{agent?.displayName?.charAt(0) ?? "?"}
									</span>
								</div>
							)}
                            {/* Ilustración del agente encima del fondo */}
                            <picture className={`${imgLoaded ? "" : "hidden"} block h-full`}>
                                <img
                                    src={agent?.fullPortrait ?? agent?.fullPortraitV2 ?? agent?.displayIcon}
                                    alt={agent?.displayName}
                                    className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]"
                                    onLoad={() => setImgLoaded(true)}
                                />
                            </picture>
                        </div>

                        {/* Panel lateral: Habilidades */}
                        <article className="sm:col-span-2 relative z-10 space-y-2">
                            <h4 className="font-bebas text-2xl tracking-widest uppercase text-foreground border-b border-border/50 pb-2 mb-3">
                                Habilidades
                            </h4>
                            <Accordion type="single" collapsible className="space-y-1">
                                {agent?.abilities.map((ability, index) => (
                                    <AbilityItem key={index} ability={ability} />
                                ))}
                            </Accordion>

                            {/* Rol descripción */}
                            {agent?.role?.description && (
                                <div className="mt-4 pt-3 border-t border-border/30">
                                    <h4 className="font-bebas text-lg tracking-widest uppercase text-muted-foreground mb-1">
                                        Rol: {agent.role.displayName}
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        {agent.role.description}
                                    </p>
                                </div>
                            )}
                        </article>
                    </section>

                    {/* Footer: Descripción + Tags */}
                    <div className="px-6 pb-6 space-y-3">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {agent?.description}
                        </p>
                        {agent?.characterTags && agent.characterTags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {agent.characterTags.map((tag, i) => (
                                    <Badge key={i} variant="outline" className="font-bebas tracking-wider uppercase text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </article>
                )}
            </DialogContent>
        </Dialog>
    )
}