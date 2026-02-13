import { DiContextProvider } from "../di/di.provider";
import { LoadingProvider } from "../loading/loading.provider";
import { ThemeProvider } from "../theme/theme.context";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
        <DiContextProvider>
            <LoadingProvider>{children}</LoadingProvider>
        </DiContextProvider>
    </ThemeProvider>
  );
}
