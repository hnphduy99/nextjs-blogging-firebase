import { Toaster } from 'sonner';
import { ThemeProvider } from './theme-provider';
import { AuthProvider } from './auth-provider';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      <AuthProvider>{children}</AuthProvider>
      <Toaster
        position='top-right'
        expand
        closeButton
        duration={5000}
        toastOptions={{
          classNames: {
            toast: '!bg-background !border-border !outline-ring/50'
          }
        }}
      />
    </ThemeProvider>
  );
}
