import styles from './PokemonCard.module.css';
import { formatPokemonId, formatTypeColor } from '../../utils/formatters';

/**
 * Tarjeta de Pokémon para el listado principal.
 * Responsabilidad: mostrar datos básicos del Pokémon y disparar el evento de clic.
 *
 * @param {{ pokemon: Object, onClick: Function }}
 */
const PokemonCard = ({ pokemon, onClick }) => {
  const { id, name, imageUrl, types, stats } = pokemon;

  const primaryTypeColor = formatTypeColor(types[0] || 'normal');

  const handleClick = () => onClick(id);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(id);
    }
  };

  return (
    <article
      className={styles.pokemonCard}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles de ${name}`}
      style={{ '--type-color': primaryTypeColor }}
    >
      {/* Cabecera coloreada por tipo primario */}
      <div
        className={styles.pokemonCard__header}
        style={{
          background: `linear-gradient(160deg, ${primaryTypeColor}ee 0%, ${primaryTypeColor}88 100%)`,
        }}
      >
        {/* Círculos decorativos al estilo Pokédex */}
        <div className={styles.pokemonCard__circle} />
        <div className={styles.pokemonCard__circle2} />

        <img
          src={imageUrl}
          alt={name}
          className={styles.pokemonCard__image}
          loading="lazy"
        />
      </div>

      {/* Cuerpo blanco con datos */}
      <div className={styles.pokemonCard__body}>
        <span className={styles.pokemonCard__id}>{formatPokemonId(id)}</span>
        <h3 className={styles.pokemonCard__name}>{name}</h3>

        <div className={styles.pokemonCard__types}>
          {types.map((type) => (
            <span
              key={type}
              className={styles.pokemonCard__type}
              style={{ backgroundColor: formatTypeColor(type) }}
            >
              {type}
            </span>
          ))}
        </div>

        {stats?.hp !== undefined && (
          <div className={styles.pokemonCard__stat}>
            <span className={styles.pokemonCard__statLabel}>HP</span>
            <div className={styles.pokemonCard__statBar}>
              <div
                className={styles.pokemonCard__statFill}
                style={{ width: `${Math.min((stats.hp / 255) * 100, 100)}%` }}
              />
            </div>
            <span className={styles.pokemonCard__statValue}>{stats.hp}</span>
          </div>
        )}
      </div>
    </article>
  );
};

export default PokemonCard;
