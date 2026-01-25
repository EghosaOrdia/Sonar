import React from "react";
import useStep from "../store/useStep";
import { IdleState, ScanningState, ResultsState } from "../minicomponents";
import SuccessState from "../minicomponents/SuccessState";

const PickFolderApp = () => {
  const step = useStep((state) => state.step);

  return (
    <section id="pickfolder" className="py-24 lg:py-32 px-6 relative">
      <div className="app-overlay absolute inset-0 pointer-events-none"></div>
      <div className="max-w-4xl mx-auto relative z-10 text-white">
        <div className="section-header text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Start
            <span className="text-[#1ED760]">Converting</span>
          </h2>
          <p className="text-dark-foreground text-lg">
            Select your music folder and watch the magic happen
          </p>
        </div>
        <div className="glass-card p-8 lg:p-12">
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
