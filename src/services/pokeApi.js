import { API_BASE_URL } from '../config/api';

/**
 * Obtiene la lista paginada de Pokémon desde PokeAPI
 * @param {number} offset - Número de registros a saltar
 * @param {number} limit - Cantidad de registros a obtener
 * @returns {Promise<Object>} { count, results: [{ name, url }] }
 */
export const fetchPokemonList = async (offset, limit) => {
  const response = await fetch(
    `${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
  );
  if (!response.ok) throw new Error('Error al obtener la lista de Pokémon');
  return response.json();
};

/**
 * Obtiene los datos completos de un Pokémon por su ID o nombre
 * @param {number|string} id - ID o nombre del Pokémon
 * @returns {Promise<Object>} Datos completos del Pokémon desde PokeAPI
 */
export const fetchPokemonById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/pokemon/${id}`);
  if (!response.ok) throw new Error(`Error al obtener el Pokémon ${id}`);
  return response.json();
};
