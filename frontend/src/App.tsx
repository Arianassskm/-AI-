import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./pages/HomePage";
import { AIPage } from "./pages/AIPage";
import { SpacePage } from "./pages/SpacePage";
import { ProfilePage } from "./pages/ProfilePage";
import { MedicationStatsPage } from "./pages/MedicationStatsPage";
import { MedicationCabinetPage } from "./pages/MedicationCabinetPage";
import { MedicationPlanManagementPage } from "./pages/MedicationPlanManagementPage";
import { ManualEntryPage } from "./pages/ManualEntryPage";
import { ReminderPage } from "./pages/ReminderPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AuthGuard } from "@/components/AuthGuard";
import { ToastProvider } from "@/hooks/useToast";
import { useLocalStorageListener } from "@/hooks/useLocalStorage";

export default function App() {
  const [accessToken] = useLocalStorageListener("accessToken", "");
  const isLoggedIn = !!accessToken;

  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthGuard>
          <div className="h-full flex flex-col">
            <main className="flex-1 relative">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/ai" element={<AIPage />} />
                <Route path="/space" element={<SpacePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route
                  path="/medication-stats"
                  element={<MedicationStatsPage />}
                />
                <Route
                  path="/medication-cabinet"
                  element={<MedicationCabinetPage />}
                />
                <Route
                  path="/medication-plans"
                  element={<MedicationPlanManagementPage />}
                />
                <Route path="/manual-entry" element={<ManualEntryPage />} />
                <Route path="/reminder" element={<ReminderPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
            {isLoggedIn && <Navigation />}
          </div>
        </AuthGuard>
      </ToastProvider>
    </BrowserRouter>
  );
}
