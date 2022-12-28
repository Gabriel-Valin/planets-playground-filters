import './App.css';
import PlanetsProvider from './PlanetsProvider';
import Dashboard from './Dashboard'

function App() {
  return (
    <PlanetsProvider>
      <Dashboard />
    </PlanetsProvider>
  );
}

export default App;