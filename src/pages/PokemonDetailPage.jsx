import { useParams, useNavigate } from 'react-router-dom';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import PokemonDetail from '../components/PokemonDetail/PokemonDetail';
import styles from './PokemonDetailPage.module.css';

/**
 * Vista (Vista-Componente) del detalle de un Pokémon.
 * Responsabilidad: obtener el ID de la URL, usar el hook de detalle
 * y pasar los datos al componente PokemonDetail.
 */
const PokemonDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pokemon, loading, error } = usePokemonDetail(id);

  const handleBack = () => navigate(-1);

  if (loading) {
    return (
      <div className={styles.pokemonDetailPage__status}>
        <p className={styles.pokemonDetailPage__loading}>Cargando Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pokemonDetailPage__status}>
        <p className={styles.pokemonDetailPage__error}>Error: {error}</p>
        <button className={styles.pokemonDetailPage__back} onClick={handleBack}>
          ← Volver
        </button>
      </div>
    );
  }

  if (!pokemon) return null;

  return <PokemonDetail pokemon={pokemon} onBack={handleBack} />;
};

export default PokemonDetailPage;
