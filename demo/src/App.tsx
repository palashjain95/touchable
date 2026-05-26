import { Routes, Route, Navigate } from "react-router-dom";
import { DocsShell } from "./components/docs/DocsShell";
import { ComponentsPage } from "./pages/ComponentsPage";
import { HowToUsePage } from "./pages/HowToUsePage";
import { TokensPage } from "./pages/TokensPage";
import { DesignerPage } from "./pages/DesignerPage";

export default function App() {
  return (
    <DocsShell>
      <Routes>
        <Route path="/" element={<ComponentsPage />} />
        <Route path="/docs/how-to-use" element={<HowToUsePage />} />
        <Route path="/docs/installation" element={<Navigate to="/docs/how-to-use" replace />} />
        <Route path="/docs/integration" element={<Navigate to="/docs/how-to-use" replace />} />
        <Route path="/docs/tokens" element={<TokensPage />} />
        <Route path="/docs/designer" element={<DesignerPage />} />
        <Route path="/docs/*" element={<Navigate to="/" replace />} />
      </Routes>
    </DocsShell>
  );
}
