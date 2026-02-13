import DiProviders from "../di/di-providers";
import { LoadingProvider } from "../loading/loading.provider";
import { ThemeProvider } from "../theme/theme.context";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <DiProviders>
        <LoadingProvider>{children}</LoadingProvider>
      </DiProviders>
    </ThemeProvider>
  );
}
