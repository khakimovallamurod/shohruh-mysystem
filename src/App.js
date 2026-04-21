import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRouter from "./AppRouter";
import MainProvider from "./provider/MainProvider";
import ErrorBoundary from "./page/error/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <MainProvider>
        <Router>
          {/* basename="/build" */}
          <AppRouter />
        </Router>
      </MainProvider>
    </ErrorBoundary>
  );
}

export default App;
