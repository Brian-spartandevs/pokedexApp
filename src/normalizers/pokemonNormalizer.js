import { SPRITES_BASE_URL } from '../config/api';
import { formatPokemonName } from '../utils/formatters';

/**
 * Extrae el ID numérico de la URL de PokeAPI
 * @param {string} url - URL del recurso (ej: "https://pokeapi.co/api/v2/pokemon/1/")
 * @returns {number} ID numérico
 */
const extractIdFromUrl = (url) => {
  const parts = url.split('/').filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
};

/**
 * Normaliza un item de la lista de PokeAPI (solo nombre + url)
 * para extraer ID y nombre formateado
 * @param {Object} rawItem - { name, url }
 * @returns {{ id: number, name: string }}
 */
export const normalizePokemonListItem = (rawItem) => ({
  id: extractIdFromUrl(rawItem.url),
  name: formatPokemonName(rawItem.name),
});

/**
 * Transforma los datos crudos de PokeAPI al contrato interno de la app
 * @param {Object} rawPokemon - Respuesta cruda de /pokemon/:id
 * @returns {Object|null} Pokémon normalizado o null si no hay datos
 */
export const normalizePokeData = (rawPokemon) => {
  if (!rawPokemon) return null;

  return {
    id: rawPokemon.id,
    name: formatPokemonName(rawPokemon.name),
    imageUrl:
      rawPokemon.sprites?.other?.['official-artwork']?.front_default ||
      `${SPRITES_BASE_URL}/${rawPokemon.id}.png`,
    types: rawPokemon.types?.map((t) => t.type.name) || [],
    height: rawPokemon.height,
    weight: rawPokemon.weight,
    stats: normalizeStats(rawPokemon.stats),
    abilities: normalizeAbilities(rawPokemon.abilities),
  };
};

/**
 * Convierte el array de stats de PokeAPI a un objeto con claves legibles
 * @param {Array} rawStats - Array crudo de estadísticas
 * @returns {Object} Stats indexados por clave interna
 */
const normalizeStats = (rawStats = []) => {
  const statNameMap = {
    hp: 'hp',
    attack: 'attack',
    defense: 'defense',
    'special-attack': 'spAtk',
    'special-defense': 'spDef',
    speed: 'speed',
  };

  return rawStats.reduce((acc, stat) => {
    const key = statNameMap[stat.stat.name] || stat.stat.name;
    return { ...acc, [key]: stat.base_stat };
  }, {});
};

/**
 * Extrae los nombres de las habilidades del Pokémon
 * @param {Array} rawAbilities - Array crudo de habilidades
 * @returns {string[]} Nombres de habilidades
 */
const normalizeAbilities = (rawAbilities = []) =>
  rawAbilities.map((ability) => ability.ability.name);
