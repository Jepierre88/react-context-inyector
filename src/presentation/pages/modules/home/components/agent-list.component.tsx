import type { IAgent } from "@/domain/entities/agents/agent.entity";
import { Button } from "@/shared/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Eye } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";

type AgentListComponentProps = {
    playableAgents: IAgent[],
    onViewDetail: (agent: IAgent) => void
}
export default function AgentListComponent({
    playableAgents,
    onViewDetail
}: AgentListComponentProps) {
    return (
        <Table>
            <TableCaption className="pb-4">
                Lista completa de agentes de Valorant
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[80px]">Icono</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead className="hidden md:table-cell">Descripción</TableHead>
                    <TableHead className="hidden lg:table-cell">Habilidades</TableHead>
                    <TableHead className="text-center">Base</TableHead>
                    <TableHead className="text-center">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {playableAgents.map((agent) => (
                    <TableRow
                        key={agent.uuid}
                        className="transition-colors"
                    >
                        <TableCell>
                            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2">
                                <img
                                    src={agent.displayIconSmall}
                                    alt={agent.displayName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </TableCell>
                        <TableCell>
                            <div>
                                <p className="font-semibold">
                                    {agent.displayName}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {agent.developerName}
                                </p>
                            </div>
                        </TableCell>
                        <TableCell>
                            {agent.role && (
                                <div className="flex items-center gap-2">
                                    <img
                                        src={agent.role.displayIcon}
                                        alt={agent.role.displayName}
                                        className="w-4 h-4 brightness-0 invert opacity-70"
                                    />
                                    <span className="text-sm">
                                        {agent.role.displayName}
                                    </span>
                                </div>
                            )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell max-w-xs">
                            <p className="text-xs text-muted-foreground line-clamp-2">
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
                                            className="w-8 h-8 rounded-md border flex items-center justify-center transition-all cursor-pointer bg-primary"
                                        >
                                            <img
                                                src={ability.displayIcon}
                                                alt={ability.displayName}
                                                className="w-7 h-7 bg-primary-foreground rounded-sm object-contain"
                                            />
                                        </div>
                                    ))}
                            </div>
                        </TableCell>
                        <TableCell className="text-center">
                            <Badge variant={agent.isBaseContent ? "default" : "outline"}>
                                {agent.isBaseContent ? "Base" : "DLC"}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                            <Button variant={"outline"} size={"icon"} onClick={() => onViewDetail(agent)} title={`Ver detalles de ${agent.displayName}`}>
                                <Eye />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}