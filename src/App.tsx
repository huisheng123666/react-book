import { BrowserRouter } from "react-router-dom";
import AppRouter from "@/routers";
import { Suspense, useEffect } from "react";
import NProgress from "nprogress";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <AppRouter />
      </Suspense>
    </BrowserRouter>
  );
}

function LoadingPage() {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return "";
}

export default App;
