import useDi, { usePaymentChannel } from "@/presentation/composition/di/use-di"
import { useCallback, useState } from "react"
import type { PaymentChannel } from "@/infrastructure/datasources/payment/payment-datasource.factory"
import StrategyDumpComponent from "../strategy-dump/strategy-dump.component"

export default function StrategySmartComponent() {
    const { channel, setChannel } = usePaymentChannel()
    const processPaymentUseCase = useDi('processPaymentUseCase')

    const [amount, setAmount] = useState("")
    const [currency, setCurrency] = useState("COP")
    const [isProcessing, setIsProcessing] = useState(false)
    const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null)

    const handleChannelChange = useCallback(
        (newChannel: PaymentChannel) => {
            setChannel(newChannel)
            setPaymentSuccess(null)
        },
        [setChannel]
    )

    const parseAmount = useCallback((amount: string): number => {
        const num = Number(amount)
        return isNaN(num) ? 0 : num
    }, [])

    const processRequest = useCallback((req:Promise<void>) => {
        req.then(() => {
            setPaymentSuccess(true)
        }).catch(() => {
            setPaymentSuccess(false)
        }).finally(() => {            setIsProcessing(false)
        })
    }, [])

    const handlePay = useCallback(async () => {
        setIsProcessing(true)
        setPaymentSuccess(null)
        processRequest(processPaymentUseCase.execute(parseAmount(amount), currency))
    }, [processRequest, processPaymentUseCase, parseAmount, amount, currency])



    return (
        <StrategyDumpComponent
            channel={channel}
            amount={amount}
            currency={currency}
            isProcessing={isProcessing}
            paymentSuccess={paymentSuccess}
            onChannelChange={handleChannelChange}
            onAmountChange={setAmount}
            onCurrencyChange={setCurrency}
            onPay={handlePay}
        />
    )
}