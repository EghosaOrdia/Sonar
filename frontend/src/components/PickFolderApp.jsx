import useStep from "../store/useStep";
import { ScanningState, ResultsState, IdleState } from "../minicomponents";
import SuccessState from "../minicomponents/SuccessState";
import { useEffect, useState } from "react";

const PickFolderApp = () => {
  const step = useStep((state) => state.step);
  const [authenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/spotify/me")
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(data.authenticated));
  }, []);

  return (
    <section id="pickfolder" className="py-24 lg:py-32 px-6 relative">
      <div className="app-overlay absolute inset-0 pointer-events-none"></div>
      <div className="max-w-4xl mx-auto relative z-10 text-white">
        <div className="section-header text-center mb-12">
          <h2 className="text-10xl sm:text-4xl lg:text-10xl font-bold tracking-tight mb-4">
            Start
            <span className="text-primary-green"> Converting</span>
          </h2>
          <p className="text-dark-foreground text-lg">
            Select your music folder and watch the magic happen
          </p>
        </div>
        <div className="glass-card p-8 lg:p-12">
          <ResultsState />
          {step === 1 && <IdleState />}
          {step === 2 && <ScanningState />}
          {step === 3 && <ResultsState />}
          {step === 4 && <SuccessState />}
        </div>
      </div>
    </section>
  );
};

export default PickFolderApp;
