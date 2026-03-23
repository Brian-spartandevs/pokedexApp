import { useQuery } from '@tanstack/react-query';
import { getPokemonListWithDetails } from '../services/pokemonService';

/**
 * Hook para obtener la lista paginada de Pokémon con sus detalles completos usando TanStack Query.
 * YA NO necesita useState ni useEffect - TanStack Query maneja todo.
 * 
 * @param {number} page - Página actual (1-based)
 * @returns {{
 *   pokemonList: Array,
 *   loading: boolean,
 *   error: Error|null,
 *   totalCount: number,
 *   isLoading: boolean,
 *   isError: boolean
 * }}
 */
export const usePokemon = (page) => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['pokemon', 'list', page],
    queryFn: () => getPokemonListWithDetails(page),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  return {
    pokemonList: data?.pokemonList || [],
    totalCount: data?.totalCount || 0,
    loading: isLoading, // Alias para compatibilidad con componentes existentes
    isLoading, // TanStack Query estándar
    error: isError ? error.message : null,
    isError,
  };
};
