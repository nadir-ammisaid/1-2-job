import "./App.css";
// import LandingPage from "./pages/public/LandingPage";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";

function App() {
  return (
    <>
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
