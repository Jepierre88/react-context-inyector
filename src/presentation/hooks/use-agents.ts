import { useEffect, useState, useCallback, useRef } from "react";
import type { IAgent } from "../../domain/entities/agents/agent.entity";
import { useLoading } from "../composition/loading/use-loading";
import useDi from "../composition/di/use-di";
import { AgentsDiContext } from "../composition/di/modules/agents/agents.context";

type UseAgentsLoadingIds = {
    getAllLoadingIds?: string[]
    getByIdLoadingIds?: string[]
}

export default function useAgents(loadingIds?: UseAgentsLoadingIds) {
    const [agents, setAgents] = useState<IAgent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { getAllAgentsUseCase, getAgentByIdUseCase } = useDi(AgentsDiContext);
    const { setLoading: setGlobalLoading } = useLoading();

    // Ref estable para evitar re-renders innecesarios
    const loadingIdsRef = useRef(loadingIds);
    loadingIdsRef.current = loadingIds;

    const triggerLoading = useCallback((key: keyof UseAgentsLoadingIds, state: boolean) => {
        const ids = loadingIdsRef.current?.[key];
        if (ids) {
            ids.forEach(id => setGlobalLoading(id, state));
        }
    }, [setGlobalLoading]);

    const fetchAgents = useCallback(async () => {
        setLoading(true);
        triggerLoading("getAllLoadingIds", true);
        try {
            const agentsData = await getAllAgentsUseCase.execute();
            setAgents(agentsData.data);
        } catch (error) {
            console.error("Error fetching agents:", error);
            setError("Failed to fetch agents. Please try again later.");
        } finally {
            setLoading(false);
            triggerLoading("getAllLoadingIds", false);
        }
    }, [getAllAgentsUseCase, triggerLoading]);

    const getAgentById = useCallback(async (id: string): Promise<IAgent | null> => {
        triggerLoading("getByIdLoadingIds", true);
        try {
            const response = await getAgentByIdUseCase.execute(id);
            return response.data;
        } catch (error) {
            console.error("Error fetching agent by id:", error);
            return null;
        } finally {
            triggerLoading("getByIdLoadingIds", false);
        }
    }, [getAgentByIdUseCase, triggerLoading]);

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