import { Typography, Chip, Box } from '@mui/material';
import styles from './PokemonCard.module.css';
import { formatPokemonId, formatTypeColor } from '../../utils/formatters';

/**
 * Tarjeta de Pokémon para el listado principal.
 * Integración con Material UI v6 manteniendo estilos CSS propios.
 * 
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
      {/* Cabecera coloreada por tipo primario - ✅ MANTIENE CSS */}
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
      <Box className={styles.pokemonCard__body}>
        <Typography 
          component="span" 
          className={styles.pokemonCard__id}
        >
          {formatPokemonId(id)}
        </Typography>

        <Typography 
          variant="h6" 
          component="h3" 
          className={styles.pokemonCard__name}
        >
          {name}
        </Typography>

        <Box className={styles.pokemonCard__types}>
          {types.map((type) => (
            <Chip
              key={type}
              label={type}
              size="small"
              className={styles.pokemonCard__type}
              sx={{
                backgroundColor: formatTypeColor(type),
                color: 'white',
                fontWeight: 700,
                textTransform: 'capitalize',
                fontSize: '10px',
                height: 'auto',
                '& .MuiChip-label': {
                  padding: '3px 10px',
                },
              }}
            />
          ))}
        </Box>

        {stats?.hp !== undefined && (
          <div className={styles.pokemonCard__stat}>
            <Typography 
              component="span" 
              className={styles.pokemonCard__statLabel}
            >
              HP
            </Typography>
            <div className={styles.pokemonCard__statBar}>
              <div
                className={styles.pokemonCard__statFill}
                style={{ width: `${Math.min((stats.hp / 255) * 100, 100)}%` }}
              />
            </div>
            <Typography 
              component="span" 
              className={styles.pokemonCard__statValue}
            >
              {stats.hp}
            </Typography>
          </div>
        )}
      </Box>
    </article>
  );
};

export default PokemonCard;
