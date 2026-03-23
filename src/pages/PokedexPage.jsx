import { usePokemon } from '../hooks/usePokemon';
import { usePagination } from '../hooks/usePagination';
import Pokedex from '../components/Pokedex/Pokedex';
import { POKEMON_PER_PAGE } from '../utils/constants';

/**
 * Vista (Vista-Componente) del listado principal.
 * Responsabilidad: orquestar hooks de datos y paginación,
 * luego pasar props al componente Pokedex.
 */
const PokedexPage = () => {
  const { currentPage, goToPage } = usePagination();
  const { pokemonList, loading, error, totalCount } = usePokemon(currentPage);

  const totalPages = Math.ceil(totalCount / POKEMON_PER_PAGE);

  return (
    <Pokedex
      pokemonList={pokemonList}
      loading={loading}
      error={error}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={goToPage}
    />
  );
};

export default PokedexPage;
