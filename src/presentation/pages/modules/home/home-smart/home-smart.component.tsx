import useAgents from "../../../../hooks/use-agents";
import HomeDumpComponent from "../home-dump/home-dump.component";
export default function HomeSmartComponent() {


    const {
        agents
    } = useAgents()
    return (
        <HomeDumpComponent agents={agents}/>
    )
}