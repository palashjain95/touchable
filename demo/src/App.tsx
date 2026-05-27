import { Routes, Route } from "react-router-dom";
import { DocsShell } from "./components/docs/DocsShell";
import { ComponentsPage } from "./pages/ComponentsPage";
import { HowToUsePage } from "./pages/HowToUsePage";
import { TokensPage } from "./pages/TokensPage";
import { DesignerPage } from "./pages/DesignerPage";
import { DesignPrinciplesPage } from "./pages/DesignPrinciplesPage";
import { HapticsPage } from "./pages/HapticsPage";

export default function App() {
  return (
    <DocsShell>
      <Routes>
        <Route path="/" element={<DesignPrinciplesPage />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/how-to-use" element={<HowToUsePage />} />
        <Route path="/tokens" element={<TokensPage />} />
        <Route path="/haptics" element={<HapticsPage />} />
        <Route path="/designer" element={<DesignerPage />} />
      </Routes>
    </DocsShell>
  );
}
