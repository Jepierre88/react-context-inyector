import { useEffect, useState, useCallback } from "react";
import useDIContext from "../composition/di/use-di-context";
import type { IAgent } from "../../domain/entities/agents/agent.entity";

export default function useAgents() {
    const [agents, setAgents] = useState<IAgent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { getAllAgentsUseCase, getAgentByIdUseCase } = useDIContext();

    const fetchAgents = useCallback(async () => {
        setLoading(true);
        try {
            const agentsData = await getAllAgentsUseCase.execute();
            setAgents(agentsData.data);
        } catch (error) {
            console.error("Error fetching agents:", error);
            setError("Failed to fetch agents. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [getAllAgentsUseCase]);

    const getAgentById = useCallback(async (id: string): Promise<IAgent | null> => {
        try {
            const response = await getAgentByIdUseCase.execute(id);
            return response.data;
        } catch (error) {
            console.error("Error fetching agent by id:", error);
            return null;
        }
    }, [getAgentByIdUseCase]);

    useEffect(() => {
        fetchAgents();
    }, [fetchAgents]);
    return {
        agents,
        loading,
        error,
        fetchAgents,
        getAgentById
    };
}