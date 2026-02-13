import * as React from "react"

import { cn } from "@/shared/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableSkeleton({
  totalRows = 5,
}: {
  totalRows?: number
}) {
    return (
        <>
            {[...Array(totalRows)].map((_, i) => (
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

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableSkeleton,
}
