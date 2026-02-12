import type { IAgent } from "@/domain/entities/agents/agent.entity";
import { Button } from "@/shared/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Eye } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { useLoading } from "@/presentation/composition/loading/use-loading";

type AgentListComponentProps = {
    playableAgents: IAgent[],
    onViewDetail: (agent: IAgent) => void
}

function getAgentColor(agent: IAgent): string {
    if (!agent.backgroundGradientColors?.length) return "#6b7280"
    return `#${agent.backgroundGradientColors[0].slice(0, 6)}`
}

function TableSkeleton() {
    return (
        <>
            {[...Array(8)].map((_, i) => (
                <TableRow key={i} className="animate-pulse border-border/30">
                    {/* Avatar */}
                    <TableCell>
                        <div className="w-12 h-12 rounded-full bg-muted" />
                    </TableCell>
                    {/* Nombre */}
                    <TableCell>
                        <div className="space-y-2">
                            <div className="h-4 w-24 bg-muted rounded" />
                            <div className="h-2 w-16 bg-muted/60 rounded" />
                        </div>
                    </TableCell>
                    {/* Rol */}
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-muted rounded-full" />
                            <div className="h-3 w-16 bg-muted rounded" />
                        </div>
                    </TableCell>
                    {/* Descripción */}
                    <TableCell className="hidden md:table-cell">
                        <div className="space-y-1.5">
                            <div className="h-2 w-full bg-muted rounded" />
                            <div className="h-2 w-4/5 bg-muted rounded" />
                        </div>
                    </TableCell>
                    {/* Habilidades */}
                    <TableCell className="hidden lg:table-cell">
                        <div className="flex gap-1.5 justify-evenly">
                            {[...Array(4)].map((_, j) => (
                                <div key={j} className="w-8 h-8 rounded-md bg-muted" />
                            ))}
                        </div>
                    </TableCell>
                    {/* Tipo */}
                    <TableCell className="text-center">
                        <div className="h-5 w-12 bg-muted rounded-full mx-auto" />
                    </TableCell>
                    {/* Acciones */}
                    <TableCell className="text-center">
                        <div className="h-9 w-9 bg-muted rounded-md mx-auto" />
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}

export default function AgentListComponent({
    playableAgents,
    onViewDetail
}: AgentListComponentProps) {

    const { getLoadingState } = useLoading()
    const isLoading = getLoadingState("agentsList")

    return (
        <Table>
            <TableHeader>
                <TableRow className="border-border/50">
                    <TableHead className="w-20 font-bebas tracking-widest uppercase text-xs">Agente</TableHead>
                    <TableHead className="font-bebas tracking-widest uppercase text-xs">Nombre</TableHead>
                    <TableHead className="font-bebas tracking-widest uppercase text-xs">Rol</TableHead>
                    <TableHead className="hidden md:table-cell font-bebas tracking-widest uppercase text-xs">Descripción</TableHead>
                    <TableHead className="hidden lg:table-cell font-bebas tracking-widest uppercase text-xs">Habilidades</TableHead>
                    <TableHead className="text-center font-bebas tracking-widest uppercase text-xs">Tipo</TableHead>
                    <TableHead className="text-center font-bebas tracking-widest uppercase text-xs">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading ? (
                    <TableSkeleton />
                ) : (
                <>
                {playableAgents.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={7} className="text-center py-12">
                            <p className="font-bebas text-2xl tracking-widest text-muted-foreground uppercase">
                                No se encontraron agentes
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Intenta con otra búsqueda o filtro
                            </p>
                        </TableCell>
                    </TableRow>
                )}
                {playableAgents.map((agent) => {
                    const agentColor = getAgentColor(agent)
                    return (
                    <TableRow
                        key={agent.uuid}
                        className="transition-all duration-200 hover:bg-muted/50 group border-border/30"
                        style={{ "--agent-row-color": agentColor } as React.CSSProperties}
                    >
                        <TableCell>
                            <div
                                className="relative w-12 h-12 rounded-full overflow-hidden ring-2 transition-all duration-300 group-hover:ring-[3px] group-hover:scale-110"
                                style={{ borderColor: agentColor, boxShadow: `0 0 0 2px ${agentColor}` }}
                            >
                                <img
                                    src={agent.displayIconSmall}
                                    alt={agent.displayName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </TableCell>
                        <TableCell>
                            <div>
                                <p className="font-bebas text-lg tracking-wider uppercase group-hover:text-(--agent-row-color) transition-colors">
                                    {agent.displayName}
                                </p>
                                <p className="font-mono text-[10px] text-muted-foreground opacity-50">
                                    // {agent.developerName}
                                </p>
                            </div>
                        </TableCell>
                        <TableCell>
                            {agent.role && (
                                <div className="flex items-center gap-2">
                                    <img
                                        src={agent.role.displayIcon}
                                        alt={agent.role.displayName}
                                        className="w-4 h-4 dark:invert-0 invert opacity-70"
                                    />
                                    <span className="font-bebas tracking-wider text-sm uppercase">
                                        {agent.role.displayName}
                                    </span>
                                </div>
                            )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell max-w-xs">
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                {agent.description}
                            </p>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                            <div className="flex gap-1.5 w-full justify-evenly">
                                {agent.abilities
                                    ?.filter(a => a.displayIcon)
                                    .map((ability) => (
                                        <div
                                            key={ability.slot}
                                            title={ability.displayName}
                                            className="w-8 h-8 rounded-md border border-border/50 flex items-center justify-center transition-all cursor-pointer hover:scale-110 hover:border-foreground/30"
                                            style={{ backgroundColor: `${agentColor}20` }}
                                        >
                                            <img
                                                src={ability.displayIcon}
                                                alt={ability.displayName}
                                                className="w-6 h-6 object-contain dark:invert-0 invert"
                                            />
                                        </div>
                                    ))}
                            </div>
                        </TableCell>
                        <TableCell className="text-center">
                            <Badge
                                variant={agent.isBaseContent ? "default" : "outline"}
                                className="font-bebas tracking-wider"
                            >
                                {agent.isBaseContent ? "Base" : "DLC"}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => onViewDetail(agent)}
                                title={`Ver detalles de ${agent.displayName}`}
                                className="border-border/50 hover:border-foreground/30 transition-all hover:scale-110"
                            >
                                <Eye className="w-4 h-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                    )
                })}
                </>
                )}
            </TableBody>
        </Table>
    )
}