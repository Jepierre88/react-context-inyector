import { Input } from "@/shared/components/ui/input";
import { Search } from "lucide-react";

type AgentFiltersComponentProps = {
  roles: [string, { displayName: string; displayIcon: string }][];
  selectedRole: string | null;
  setSelectedRole: (role: string | null) => void;
  search: string;
  setSearch: (search: string) => void;
  filteredAgentsCount?: number;
  totalAgentsCount?: number;
};

export default function AgentFiltersComponent({
  roles,
  selectedRole,
  setSelectedRole,
  search,
  setSearch,
  filteredAgentsCount,
  totalAgentsCount,
}: AgentFiltersComponentProps) {
  return (
    <>
      <section className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar agente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 font-bebas tracking-wider text-lg h-11 border-border/50 focus:border-foreground/30"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedRole(null)}
            className={`font-bebas text-sm tracking-wider uppercase px-4 py-2 rounded-md border transition-all ${
              !selectedRole
                ? "bg-foreground text-background border-foreground"
                : "border-border/50 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            Todos
          </button>
          {roles.map(([uuid, role]) => (
            <button
              key={uuid}
              onClick={() =>
                setSelectedRole(selectedRole === uuid ? null : uuid)
              }
              className={`flex items-center gap-2 font-bebas text-sm tracking-wider uppercase px-4 py-2 rounded-md border transition-all ${
                selectedRole === uuid
                  ? "bg-foreground text-background border-foreground"
                  : "border-border/50 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              }`}
              title={role.displayName}
            >
              <img
                src={role.displayIcon}
                alt={role.displayName}
                className={`w-4 h-4 ${selectedRole === uuid ? "dark:invert invert-0" : "dark:invert-0 invert opacity-70"}`}
              />
              <span className="hidden sm:inline">{role.displayName}</span>
            </button>
          ))}
        </div>
      </section>
      <p className="font-mono text-xs text-muted-foreground mb-4 tracking-wider">
        // mostrando{" "}
        <span className="text-foreground font-semibold">
          {filteredAgentsCount}
        </span>{" "}
        de {totalAgentsCount} agentes
        {selectedRole && " • filtrado por rol"}
        {search && ` • buscando "${search}"`}
      </p>
    </>
  );
}
