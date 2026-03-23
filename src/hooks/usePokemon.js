import { useState, useEffect } from 'react';
import { fetchPokemonList, fetchPokemonById } from '../services/pokeApi';
import {
  normalizePokemonListItem,
  normalizePokeData,
} from '../normalizers/pokemonNormalizer';
import { POKEMON_PER_PAGE } from '../utils/constants';

/**
 * Hook para obtener la lista paginada de Pokémon con sus detalles completos.
 * Responsabilidad: estado + fetch + normalización de la lista.
 *
 * @param {number} page - Página actual (1-based)
 * @returns {{ pokemonList, loading, error, totalCount }}
 */
export const usePokemon = (page) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(null);

        const offset = (page - 1) * POKEMON_PER_PAGE;
        const listData = await fetchPokemonList(offset, POKEMON_PER_PAGE);

        // Extraer IDs para luego pedir detalles completos (tipos, stats)
        const partialItems = listData.results.map(normalizePokemonListItem);
        const details = await Promise.all(
          partialItems.map((item) => fetchPokemonById(item.id))
        );

        setPokemonList(details.map(normalizePokeData));
        setTotalCount(listData.count);
      } catch (err) {
        setError(err.message || 'Error cargando Pokémon');
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [page]);

  return { pokemonList, loading, error, totalCount };
};
