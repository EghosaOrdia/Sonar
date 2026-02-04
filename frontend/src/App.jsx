import { Toaster } from "sonner";
import "./App.css";
import { Hero, HowItWorks, PickFolderApp } from "./components";

function App() {
  return (
    <main className="min-h-screen bg-primary-dark font-family-sans font-normal">
      <div className="noise-overlay"></div>
      <Toaster />
      <Hero />
      <HowItWorks />
      <PickFolderApp />
    </main>
  );
}

export default App;
