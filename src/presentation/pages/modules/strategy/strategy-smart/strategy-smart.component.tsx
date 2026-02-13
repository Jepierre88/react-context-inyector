import { PaymentDiContext } from "@/presentation/composition/di/modules/payment/payment.context"
import useDi from "@/presentation/composition/di/use-di"

export default function StrategySmartComponent() {
    const {
        setChannel,
        processPaymentUseCase,
        channel
    } = useDi(PaymentDiContext)
    return (
        <div>
            <button onClick={() => processPaymentUseCase.execute(2,"COP")}>Pagar</button>
            <button onClick={() => setChannel("paypal")}>Cambiar a PayPal</button>
            <button onClick={() => setChannel("card")}>Cambiar a Tarjeta</button>
            <p>Canal actual: {channel}</p>
        </div>
    )
}