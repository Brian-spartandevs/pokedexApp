import styles from './PokemonDetail.module.css';
import { formatPokemonId, formatTypeColor, formatStatName } from '../../utils/formatters';

/**
 * Vista de detalle completo de un Pokémon.
 * Responsabilidad: mostrar todos los datos y gestionar el evento de volver.
 *
 * @param {{ pokemon: Object, onBack: Function }}
 */
const PokemonDetail = ({ pokemon, onBack }) => {
  const { id, name, imageUrl, types, stats, abilities, height, weight } = pokemon;
  const primaryColor = formatTypeColor(types[0]);

  return (
    <div className={styles.pokemonDetail}>
      <button className={styles.pokemonDetail__back} onClick={onBack}>
        ← Volver
      </button>

      <div className={styles.pokemonDetail__card}>
        {/* Hero coloreado por tipo */}
        <div
          className={styles.pokemonDetail__hero}
          style={{ background: `linear-gradient(145deg, ${primaryColor}dd, ${primaryColor}88)` }}
        >
          <div className={styles.pokemonDetail__heroBg} />

          <div className={styles.pokemonDetail__header}>
            <span className={styles.pokemonDetail__id}>{formatPokemonId(id)}</span>
            <h1 className={styles.pokemonDetail__name}>{name}</h1>
          </div>

          <div className={styles.pokemonDetail__types}>
            {types.map((type) => (
              <span
                key={type}
                className={styles.pokemonDetail__type}
              >
                {type}
              </span>
            ))}
          </div>

          <img
            className={styles.pokemonDetail__image}
            src={imageUrl}
            alt={name}
          />
        </div>

        {/* Cuerpo blanco */}
        <div className={styles.pokemonDetail__body}>
          <div className={styles.pokemonDetail__info}>
            <div className={styles.pokemonDetail__infoItem}>
              <span className={styles.pokemonDetail__infoLabel}>Altura</span>
              <span className={styles.pokemonDetail__infoValue}>{height / 10} m</span>
            </div>
            <div className={styles.pokemonDetail__infoItem}>
              <span className={styles.pokemonDetail__infoLabel}>Peso</span>
              <span className={styles.pokemonDetail__infoValue}>{weight / 10} kg</span>
            </div>
            <div className={styles.pokemonDetail__infoItem}>
              <span className={styles.pokemonDetail__infoLabel}>Tipos</span>
              <span className={styles.pokemonDetail__infoValue}>{types.length}</span>
            </div>
          </div>

          <section className={styles.pokemonDetail__section}>
            <h2 className={styles.pokemonDetail__sectionTitle}>Estadísticas</h2>
            {Object.entries(stats).map(([statKey, value]) => (
              <div key={statKey} className={styles.pokemonDetail__stat}>
                <span className={styles.pokemonDetail__statName}>
                  {formatStatName(statKey)}
                </span>
                <span className={styles.pokemonDetail__statValue}>{value}</span>
                <div className={styles.pokemonDetail__statBar}>
                  <div
                    className={styles.pokemonDetail__statFill}
                    style={{ width: `${Math.min((value / 255) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </section>

          <section className={styles.pokemonDetail__section}>
            <h2 className={styles.pokemonDetail__sectionTitle}>Habilidades</h2>
            <ul className={styles.pokemonDetail__abilities}>
              {abilities.map((ability) => (
                <li key={ability} className={styles.pokemonDetail__ability}>
                  {ability}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;

