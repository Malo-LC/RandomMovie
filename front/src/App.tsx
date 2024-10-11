import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar.tsx';

function App() {
  return (
    <div className="flex h-screen flex-col bg-black">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
