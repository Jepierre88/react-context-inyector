import { BookX } from "lucide-react";

type EmptyStateComponentProps = {
    message?: string;
    description?: string;
    className?: string;
};

export default function EmptyStateComponent({
    message = "No se encontraron resultados",
    description,
    className = "",
}: EmptyStateComponentProps) {
    return (
        <div className={`flex flex-col items-center gap-2 py-10 w-full text-center ${className}`}>
            <BookX className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground text-sm font-medium">{message}</p>
            {description && (
                <p className="text-xs text-muted-foreground/80 max-w-md">
                    {description}
                </p>
            )}
        </div>
    );
}