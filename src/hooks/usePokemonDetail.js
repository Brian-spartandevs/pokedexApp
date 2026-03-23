import { useQuery } from '@tanstack/react-query';
import { getPokemonById } from '../services/pokemonService';

/**
 * Hook para obtener los datos completos de un Pokémon por su ID usando TanStack Query.
 * YA NO necesita useState ni useEffect - TanStack Query maneja todo.
 *
 * @param {string|number} id - ID del Pokémon
 * @returns {{
 *   pokemon: Object|null,
 *   loading: boolean,
 *   error: Error|null,
 *   isLoading: boolean,
 *   isError: boolean
 * }}
 */
export const usePokemonDetail = (id) => {
  const {
    data: pokemon,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['pokemon', 'detail', id],
    queryFn: () => getPokemonById(id),
    enabled: !!id, // Solo ejecutar si hay ID
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  return {
    pokemon: pokemon || null,
    loading: isLoading, // Alias para compatibilidad
    isLoading,
    error: isError ? error.message : null,
    isError,
  };
};
