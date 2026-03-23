import { useNavigate } from 'react-router-dom';
import PokemonCard from '../PokemonCard/PokemonCard';
import Pagination from '../Pagination/Pagination';
import styles from './Pokedex.module.css';

/**
 * Contenedor principal con diseño temático de Pokédex.
 * Responsabilidad: renderizar la pantalla (grid de cards) y los controles.
 *
 * @param {{
 *   pokemonList: Object[],
 *   loading: boolean,
 *   error: string|null,
 *   currentPage: number,
 *   totalPages: number,
 *   onPageChange: Function
 * }}
 */
const Pokedex = ({ pokemonList, loading, error, currentPage, totalPages, onPageChange }) => {
  const navigate = useNavigate();

  const handlePokemonClick = (id) => navigate(`/pokemon/${id}`);

  return (
    <div className={styles.pokedex}>
      {/* Pantalla LCD simulada */}
      <div className={styles.pokedex__screen}>
        {loading && (
          <div className={styles.pokedex__status}>
            <div className={styles.pokedex__spinner} role="status" aria-label="Cargando Pokémon" />
            <p className={styles.pokedex__loadingText}>Buscando Pokémon…</p>
          </div>
        )}

        {error && !loading && (
          <div className={styles.pokedex__status}>
            <p className={styles.pokedex__error}>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className={styles.pokedex__grid}>
            {pokemonList.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onClick={handlePokemonClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Panel de controles — parte baja del Pokédex */}
      {!loading && (
        <div className={styles.pokedex__controls}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Pokedex;
