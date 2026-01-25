import "./App.css";
import { Hero, HowItWorks, PickFolderApp } from "./components";

function App() {
  return (
    <main className="min-h-screen bg-primary-dark">
      <div className="noise-overlay"></div>
      <Hero />
      <HowItWorks />
      <PickFolderApp />
    </main>
  );
}

export default App;
