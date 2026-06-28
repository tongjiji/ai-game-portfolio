import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthGuard } from './components/AuthGuard';
import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { PortfolioDetail } from './pages/PortfolioDetail';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';
import { Admin } from './pages/Admin';
import { AdminLogin } from './pages/AdminLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/portfolio"
          element={
            <>
              <Navbar />
              <Portfolio />
              <Footer />
            </>
          }
        />
        <Route
          path="/portfolio/:id"
          element={
            <>
              <Navbar />
              <PortfolioDetail />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
            </>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AuthGuard>
              <Admin />
            </AuthGuard>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
