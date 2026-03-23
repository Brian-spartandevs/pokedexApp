import { API_BASE_URL } from '../config/api';
import {
  normalizePokemonListItem,
  normalizePokeData,
} from '../normalizers/pokemonNormalizer';
import { POKEMON_PER_PAGE } from '../utils/constants';

/**
 * Servicio para TanStack Query - Obtiene lista paginada de Pokémon con detalles completos
 * Usa fetch nativo (NO Axios) según restricción del proyecto
 * 
 * @param {number} page - Página actual (1-based)
 * @returns {Promise<{ pokemonList: Array, totalCount: number }>}
 */
export const getPokemonListWithDetails = async (page) => {
  const offset = (page - 1) * POKEMON_PER_PAGE;

  // 1. Obtener lista paginada
  const listResponse = await fetch(
    `${API_BASE_URL}/pokemon?offset=${offset}&limit=${POKEMON_PER_PAGE}`
  );

  if (!listResponse.ok) {
    throw new Error('Error al obtener la lista de Pokémon');
  }

  const listData = await listResponse.json();

  // 2. Extraer IDs para pedir detalles completos
  const partialItems = listData.results.map(normalizePokemonListItem);

  // 3. Obtener detalles de cada Pokémon en paralelo
  const detailsPromises = partialItems.map(async (item) => {
    const detailResponse = await fetch(`${API_BASE_URL}/pokemon/${item.id}`);
    
    if (!detailResponse.ok) {
      throw new Error(`Error al obtener Pokémon ${item.id}`);
    }
    
    const detailData = await detailResponse.json();
    return normalizePokeData(detailData);
  });

  const pokemonList = await Promise.all(detailsPromises);

  return {
    pokemonList,
    totalCount: listData.count,
  };
};

/**
 * Servicio para TanStack Query - Obtiene detalle de un Pokémon por ID
 * 
 * @param {number} id - ID del Pokémon
 * @returns {Promise<Object>} Pokémon normalizado
 */
export const getPokemonById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/pokemon/${id}`);
  
  if (!response.ok) {
    throw new Error(`Error al obtener el Pokémon ${id}`);
  }
  
  const data = await response.json();
  return normalizePokeData(data);
};
