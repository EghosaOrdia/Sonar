import { Toaster } from "sonner";
import "./App.css";
import { Hero, HowItWorks, PickFolderApp } from "./components";
import Header from "./components/Header";
import Features from "./components/Features";

function App() {
  return (
    <main className="min-h-screen bg-[#05060A] font-family-sans font-normal">
      <div className="noise-overlay"></div>
      <Toaster theme="dark" position="top-center" />
      <Header />
      <Hero />
      <HowItWorks />
      <PickFolderApp />
      <Features />
    </main>
  );
}

export default App;
