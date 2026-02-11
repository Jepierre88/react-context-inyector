import { useContext } from "react";
import { DiContext } from "./di.context";

export default function useDIContext() {
    const context = useContext(DiContext);
    if (!context) {
        throw new Error("useDIContext must be used within a DIProvider");
    }
    return context;
}