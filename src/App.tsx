import { ExpenseProvider } from "./context/ExpenseContext";
import AppContent from "./components/AppContent/AppContent";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <ExpenseProvider>
        <AppContent />
      </ExpenseProvider>
    </div>
  );
};

export default App;
