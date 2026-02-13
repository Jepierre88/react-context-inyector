import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select"
import { Separator } from "@/shared/components/ui/separator"
import type { PaymentChannel } from "@/infrastructure/datasources/payment/payment-datasource.factory"
import { CreditCard, DollarSign, Wallet } from "lucide-react"

type StrategyDumpProps = {
    channel: PaymentChannel
    amount: string
    currency: string
    isProcessing: boolean
    paymentSuccess: boolean | null
    onChannelChange: (channel: PaymentChannel) => void
    onAmountChange: (amount: string) => void
    onCurrencyChange: (currency: string) => void
    onPay: () => void
}

const CURRENCIES = [
    { value: "COP", label: "🇨🇴 COP - Peso Colombiano" },
    { value: "USD", label: "🇺🇸 USD - US Dollar" },
    { value: "EUR", label: "🇪🇺 EUR - Euro" },
    { value: "MXN", label: "🇲🇽 MXN - Peso Mexicano" },
]

const CHANNELS: { value: PaymentChannel; label: string; icon: React.ReactNode; description: string }[] = [
    {
        value: "card",
        label: "Tarjeta",
        icon: <CreditCard className="size-5" />,
        description: "Débito o crédito",
    },
    {
        value: "paypal",
        label: "PayPal",
        icon: <Wallet className="size-5" />,
        description: "Cuenta PayPal",
    },
]

export default function StrategyDumpComponent({
    channel,
    amount,
    currency,
    isProcessing,
    paymentSuccess,
    onChannelChange,
    onAmountChange,
    onCurrencyChange,
    onPay,
}: StrategyDumpProps) {
    return (
        <div className="min-h-dvh flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">Procesar Pago</CardTitle>
                            <CardDescription>
                                Patrón Strategy + Clean Architecture
                            </CardDescription>
                        </div>
                        <Badge variant="outline" className="gap-1.5">
                            {channel === "card" ? (
                                <CreditCard className="size-3" />
                            ) : (
                                <Wallet className="size-3" />
                            )}
                            {channel === "card" ? "Tarjeta" : "PayPal"}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Payment channel selector */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium">
                            Método de pago
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                            {CHANNELS.map((ch) => (
                                <button
                                    key={ch.value}
                                    type="button"
                                    onClick={() => onChannelChange(ch.value)}
                                    className={`relative flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all hover:bg-accent/50 cursor-pointer ${
                                        channel === ch.value
                                            ? "border-primary bg-primary/5 shadow-sm"
                                            : "border-border"
                                    }`}
                                >
                                    <div
                                        className={`rounded-full p-2 ${
                                            channel === ch.value
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted text-muted-foreground"
                                        }`}
                                    >
                                        {ch.icon}
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-medium">{ch.label}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {ch.description}
                                        </p>
                                    </div>
                                    {channel === ch.value && (
                                        <div className="absolute top-2 right-2 size-2 rounded-full bg-primary" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* Amount & Currency */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount">Monto</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    id="amount"
                                    type="number"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    value={amount}
                                    onChange={(e) => onAmountChange(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="currency">Moneda</Label>
                            <Select value={currency} onValueChange={onCurrencyChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecciona moneda" />
                                </SelectTrigger>
                                <SelectContent>
                                    {CURRENCIES.map((c) => (
                                        <SelectItem key={c.value} value={c.value}>
                                            {c.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Payment result feedback */}
                    {paymentSuccess !== null && (
                        <div
                            className={`rounded-lg border p-3 text-sm ${
                                paymentSuccess
                                    ? "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400"
                                    : "border-destructive/30 bg-destructive/10 text-destructive"
                            }`}
                        >
                            {paymentSuccess
                                ? `✓ Pago de ${amount} ${currency} procesado exitosamente vía ${channel === "card" ? "Tarjeta" : "PayPal"}`
                                : "✗ Error al procesar el pago. Intenta nuevamente."}
                        </div>
                    )}
                </CardContent>

                <CardFooter>
                    <Button
                        className="w-full gap-2"
                        size="lg"
                        disabled={isProcessing || !amount || Number(amount) <= 0}
                        onClick={onPay}
                    >
                        {isProcessing ? (
                            <>
                                <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                Procesando...
                            </>
                        ) : (
                            <>
                                {channel === "card" ? (
                                    <CreditCard className="size-4" />
                                ) : (
                                    <Wallet className="size-4" />
                                )}
                                Pagar {amount && Number(amount) > 0 ? `${amount} ${currency}` : ""}
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
