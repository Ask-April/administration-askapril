
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { Toaster } from "sonner"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/react-query"

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster position="top-right" />
    </QueryClientProvider>
  </AuthProvider>
);
