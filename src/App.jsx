import { useState, useEffect } from "react";
import { fontImportUrl } from "./theme/theme";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [lightMode, setLightMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  useEffect(() => {
    const handler = (e) => {
      setSelectedProjectId(e.detail);
      setPage("project");
    };
    window.addEventListener("navigate-project", handler);
    return () => window.removeEventListener("navigate-project", handler);
  }, []);

  if (page === "project" && selectedProjectId) {
    return (
      <>
        <link href={fontImportUrl} rel="stylesheet" />
        <ProjectPage
          projectId={selectedProjectId}
          onBack={() => { setPage("home"); window.scrollTo(0, 0); }}
          isMobile={isMobile}
        />
      </>
    );
  }

  return (
    <>
      <link href={fontImportUrl} rel="stylesheet" />
      <HomePage
        lightMode={lightMode}
        setLightMode={setLightMode}
        isMobile={isMobile}
        setPage={setPage}
        setSelectedProjectId={setSelectedProjectId}
      />
    </>
  );
}
