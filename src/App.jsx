import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header/Header';
import PokedexPage from './pages/PokedexPage';
import PokemonDetailPage from './pages/PokemonDetailPage';

/**
 * Componente raíz — configura el router y define las rutas de la app.
 */
const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<PokedexPage />} />
        <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
