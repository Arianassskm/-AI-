import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { AIPage } from './pages/AIPage';
import { SpacePage } from './pages/SpacePage';
import { ProfilePage } from './pages/ProfilePage';
import { MedicationStatsPage } from './pages/MedicationStatsPage';
import { MedicationCabinetPage } from './pages/MedicationCabinetPage';
import { MedicationPlanManagementPage } from './pages/MedicationPlanManagementPage';
import { ManualEntryPage } from './pages/ManualEntryPage';
import { ReminderPage } from './pages/ReminderPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="h-full flex flex-col">
        <main className="flex-1 relative">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ai" element={<AIPage />} />
            <Route path="/space" element={<SpacePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/medication-stats" element={<MedicationStatsPage />} />
            <Route path="/medication-cabinet" element={<MedicationCabinetPage />} />
            <Route path="/medication-plans" element={<MedicationPlanManagementPage />} />
            <Route path="/manual-entry" element={<ManualEntryPage />} />
            <Route path="/reminder" element={<ReminderPage />} />
          </Routes>
        </main>
        <Navigation />
      </div>
    </BrowserRouter>
  );
}