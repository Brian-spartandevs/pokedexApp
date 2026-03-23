import { TYPE_COLORS } from './constants';

/**
 * Capitaliza la primera letra y reemplaza guiones por espacios
 * @param {string} name - Nombre en formato crudo de PokeAPI
 * @returns {string} Nombre formateado
 */
export const formatPokemonName = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');

/**
 * Formatea el ID del Pokémon con padding de ceros
 * @param {number} id - ID numérico del Pokémon
 * @returns {string} ID con formato "#001"
 */
export const formatPokemonId = (id) =>
  `#${String(id).padStart(3, '0')}`;

/**
 * Devuelve el color hexadecimal correspondiente al tipo de Pokémon
 * @param {string} type - Nombre del tipo
 * @returns {string} Color hexadecimal
 */
export const formatTypeColor = (type) =>
  TYPE_COLORS[type] || '#A8A878';

/**
 * Traduce la clave interna de estadística al nombre en español
 * @param {string} statKey - Clave interna (ej: "spAtk")
 * @returns {string} Nombre legible en español
 */
export const formatStatName = (statKey) => {
  const statNames = {
    hp: 'HP',
    attack: 'Ataque',
    defense: 'Defensa',
    spAtk: 'At. Esp.',
    spDef: 'Def. Esp.',
    speed: 'Velocidad',
  };
  return statNames[statKey] || statKey;
};
