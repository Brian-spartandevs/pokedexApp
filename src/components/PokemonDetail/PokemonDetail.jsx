import { Typography, Button, Chip, Box, LinearProgress } from '@mui/material';
import styles from './PokemonDetail.module.css';
import { formatPokemonId, formatTypeColor, formatStatName } from '../../utils/formatters';

/**
 * Vista de detalle completo de un Pokémon.
 * Integración con Material UI v6 manteniendo estilos CSS propios.
 * 
 * Responsabilidad: mostrar todos los datos y gestionar el evento de volver.
 *
 * @param {{ pokemon: Object, onBack: Function }}
 */
const PokemonDetail = ({ pokemon, onBack }) => {
  const { id, name, imageUrl, types, stats, abilities, height, weight } = pokemon;
  const primaryColor = formatTypeColor(types[0]);

  return (
    <Box className={styles.pokemonDetail}>
      <Button 
        className={styles.pokemonDetail__back} 
        onClick={onBack}
        variant="outlined"
        size="small"
      >
        ← Volver
      </Button>

      <Box className={styles.pokemonDetail__card}>
        {/* Hero coloreado por tipo */}
        <Box
          className={styles.pokemonDetail__hero}
          style={{ background: `linear-gradient(145deg, ${primaryColor}dd, ${primaryColor}88)` }}
        >
          <div className={styles.pokemonDetail__heroBg} />

          <Box className={styles.pokemonDetail__header}>
            <Typography 
              component="span" 
              className={styles.pokemonDetail__id}
            >
              {formatPokemonId(id)}
            </Typography>
            <Typography 
              variant="h3" 
              component="h1" 
              className={styles.pokemonDetail__name}
            >
              {name}
            </Typography>
          </Box>

          <Box className={styles.pokemonDetail__types}>
            {types.map((type) => (
              <Chip
                key={type}
                label={type}
                size="small"
                className={styles.pokemonDetail__type}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.35)',
                  backdropFilter: 'blur(4px)',
                }}
              />
            ))}
          </Box>

          <img
            className={styles.pokemonDetail__image}
            src={imageUrl}
            alt={name}
            loading="lazy"
          />
        </Box>

        {/* Cuerpo blanco */}
        <Box className={styles.pokemonDetail__body}>
          <Box className={styles.pokemonDetail__info}>
            <Box className={styles.pokemonDetail__infoItem}>
              <Typography 
                component="span" 
                className={styles.pokemonDetail__infoLabel}
              >
                Altura
              </Typography>
              <Typography 
                component="span" 
                className={styles.pokemonDetail__infoValue}
              >
                {height / 10} m
              </Typography>
            </Box>
            <Box className={styles.pokemonDetail__infoItem}>
              <Typography 
                component="span" 
                className={styles.pokemonDetail__infoLabel}
              >
                Peso
              </Typography>
              <Typography 
                component="span" 
                className={styles.pokemonDetail__infoValue}
              >
                {weight / 10} kg
              </Typography>
            </Box>
            <Box className={styles.pokemonDetail__infoItem}>
              <Typography 
                component="span" 
                className={styles.pokemonDetail__infoLabel}
              >
                Tipos
              </Typography>
              <Typography 
                component="span" 
                className={styles.pokemonDetail__infoValue}
              >
                {types.length}
              </Typography>
            </Box>
          </Box>

          <Box component="section" className={styles.pokemonDetail__section}>
            <Typography 
              variant="h6" 
              component="h2" 
              className={styles.pokemonDetail__sectionTitle}
            >
              Estadísticas
            </Typography>
            {Object.entries(stats).map(([statKey, value]) => (
              <Box key={statKey} className={styles.pokemonDetail__stat}>
                <Typography 
                  component="span" 
                  className={styles.pokemonDetail__statName}
                >
                  {formatStatName(statKey)}
                </Typography>
                <Typography 
                  component="span" 
                  className={styles.pokemonDetail__statValue}
                >
                  {value}
                </Typography>
                <Box className={styles.pokemonDetail__statBar}>
                  <Box
                    className={styles.pokemonDetail__statFill}
                    style={{ width: `${Math.min((value / 255) * 100, 100)}%` }}
                  />
                </Box>
              </Box>
            ))}
          </Box>

          <Box component="section" className={styles.pokemonDetail__section}>
            <Typography 
              variant="h6" 
              component="h2" 
              className={styles.pokemonDetail__sectionTitle}
            >
              Habilidades
            </Typography>
            <Box component="ul" className={styles.pokemonDetail__abilities}>
              {abilities.map((ability) => (
                <Chip
                  key={ability}
                  label={ability}
                  component="li"
                  size="small"
                  className={styles.pokemonDetail__ability}
                  variant="outlined"
                  sx={{ textTransform: 'capitalize' }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PokemonDetail;

