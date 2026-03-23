import { useState, useEffect } from 'react';
import { fetchPokemonById } from '../services/pokeApi';
import { normalizePokeData } from '../normalizers/pokemonNormalizer';

/**
 * Hook para obtener los datos completos de un Pokémon por su ID.
 * Responsabilidad: estado + fetch + normalización del detalle.
 *
 * @param {string|number} id - ID del Pokémon
 * @returns {{ pokemon, loading, error }}
 */
export const usePokemonDetail = (id) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPokemonById(id);
        setPokemon(normalizePokeData(data));
      } catch (err) {
        setError(err.message || 'Error cargando el Pokémon');
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [id]);

  return { pokemon, loading, error };
};
