import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main/Main";
import { Play } from "./pages/Play/Play";
import { Result } from "./pages/Result/Result";
import Layout from "./components/Layout"; // Layout 가져오기

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout> {/* Layout을 감싸서 모든 페이지에 배경 적용 */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/play" element={<Play />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
