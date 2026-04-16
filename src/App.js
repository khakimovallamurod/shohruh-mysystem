import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRouter from "./AppRouter";
import MainProvider from "./provider/MainProvider";

import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import NotifSound from "./components/common/notficationSound/NotifSound";
import { selectNotifSound } from "./features/notification/notificationSlice";
import ErrorBoundary from "./page/error/ErrorBoundary";

function App() {
  /* Sound notification */
  const playSound = useSelector(selectNotifSound);
  return (
    <ErrorBoundary>
      <MainProvider>
        <NotifSound play={playSound} />
        <Router>
          {/* basename="/build" */}
          <AppRouter />
        </Router>
      </MainProvider>
    </ErrorBoundary>
  );
}

export default App;
