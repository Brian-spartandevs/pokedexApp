# 📋 Especificación de Proyecto: Pokédex Web Application

## 📌 Descripción General

Desarrollo de una aplicación web **Pokédex** interactiva que consume la **PokeAPI** y proporciona una experiencia de usuario temática similar al dispositivo Pokédex del universo Pokémon.

---

## 🏗️ Stack Tecnológico

- **Build Tool**: Vite (generador de módulos ES)
- **Librería UI**: React 18+
- **Lenguaje**: JavaScript (ES6+) - SIN TypeScript
- **Router**: React Router v6
- **Gestor de paquetes**: npm
- **API Externa**: PokeAPI (https://pokeapi.co/)
- **Estilos**: CSS Modules con metodología BEM
- **Linting**: ESLint (sin tipos)
- **Formateo**: Prettier

---

## ✨ Características Principales

### 1. **Interfaz Temática Pokédex**
   - Diseño visual inspirado en un dispositivo Pokédex clásico
   - Paleta de colores rojo, blanco y negro
   - Animaciones suaves y transiciones
   - Pantalla LCD simulada con información del Pokémon
   - Botones interactivos estilizados

### 2. **Sistema de Paginación**
   - Listado de Pokémon con paginación
   - Controles para navegar: anterior, siguiente, números de página
   - Indicador visual de página actual
   - Límite configurable de Pokémon por página (ej: 20 por página)
   - URL amigable con parámetros de página (ej: `?page=1&limit=20`)
   - Integración con React Router para navegación SPA

### 3. **Visualización de Pokémon**
   - Tarjeta de Pokémon con:
     - Imagen oficial del Pokémon
     - Número de Pokédex
     - Nombre
     - Tipos
     - Estadísticas básicas
   - Detalle completo al hacer clic:
     - Todos los tipos
     - Estadísticas completas (HP, Ataque, Defensa, etc.)
     - Habilidades
     - Movimientos destacados

### 4. **Búsqueda y Filtrado**
   - Búsqueda por nombre (opcional pero recomendado)
   - Filtrado por tipo de Pokémon
   - Consultas optimizadas a PokeAPI

---

## 🏛️ Arquitectura y Patrones

### Estructura de Carpetas (Patrón Vista-Componente + Vite)
```
pokedex-vite/
├── index.html               # Punto de entrada HTML
├── vite.config.js           # Configuración Vite
├── package.json
├── src/
│   ├── main.jsx             # Punto de entrada React
│   ├── App.jsx              # Componente raíz
│   ├── components/
│   │   ├── common/          # Componentes reutilizables
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── Button/
│   │   ├── Pokedex/         # Componente principal contenedor
│   │   │   ├── Pokedex.jsx
│   │   │   └── Pokedex.module.css
│   │   ├── PokemonCard/     # Componente presentación de card
│   │   │   ├── PokemonCard.jsx
│   │   │   └── PokemonCard.module.css
│   │   ├── PokemonDetail/   # Componente detalle
│   │   │   ├── PokemonDetail.jsx
│   │   │   └── PokemonDetail.module.css
│   │   └── Pagination/      # Componente paginación
│   │       ├── Pagination.jsx
│   │       └── Pagination.module.css
│   ├── pages/               # Vista (conectadas a rutas)
│   │   ├── PokedexPage.jsx
│   │   └── PokemonDetailPage.jsx
│   ├── services/
│   │   └── pokeApi.js       # Llamadas API
│   ├── hooks/
│   │   ├── usePokemon.js    # Lógica de fetch
│   │   └── usePagination.js # Lógica de paginación
│   ├── normalizers/
│   │   └── pokemonNormalizer.js # Normalización de datos
│   ├── utils/
│   │   ├── formatters.js    # Funciones de formato
│   │   ├── validators.js    # Funciones de validación
│   │   └── constants.js     # Constantes
│   ├── styles/
│   │   └── global.css       # Estilos globales
│   └── config/
│       └── api.js           # Configuración API
└── dist/                    # Salida compilada (Vite build)
```

### Separación de Responsabilidades

**1. Componentes (UI Layer)**
- ✅ Solo renderizar JSX
- ✅ Mostrar props recibidas
- ✅ Disparar callbacks
- ❌ No hacer fetch de datos
- ❌ No contener lógica de negocio

```javascript
// ✅ Componente con UNA responsabilidad
const PokemonCard = ({ pokemon, onClick }) => (
  <article className="pokemon-card" onClick={() => onClick(pokemon.id)}>
    <img src={pokemon.imageUrl} alt={pokemon.name} />
    <h2>{pokemon.name}</h2>
  </article>
);
```

**2. Hooks Personalizados (Logic Layer)**
- ✅ Gestionar estado
- ✅ Efectos secundarios (fetch, setup)
- ✅ Lógica reutilizable
- ❌ No devolver JSX
- ❌ No acceder al DOM directamente

```javascript
// ✅ Hook con responsabilidad clara
const usePokemon = (id) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPokemon(id)
      .then(data => setPokemon(normalizePokeData(data)))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  return { pokemon, loading, error };
};
```

**3. Servicios (Data Access Layer)**
- ✅ Llamadas HTTP/API
- ✅ Transformación de respuestas
- ✅ Manejo de errores
- ❌ No acceder a estado de React
- ❌ No renderizar nada

```javascript
// ✅ Servicio puro
export const fetchPokemonList = async (offset, limit) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    if (!response.ok) throw new Error('API Error');
    return await response.json();
  } catch (error) {
    console.error('Error en fetchPokemonList:', error);
    throw error;
  }
};
```

**4. Normalizadores (Data Transformation)**
- ✅ Transformar datos brutos a formato esperado
- ✅ Omitir campos innecesarios
- ✅ Restructurar data
- ❌ No hacer request
- ❌ No contener lógica UI

```javascript
// ✅ Normalización de datos
export const normalizePokeData = (rawData) => ({
  id: rawData.id,
  name: capitalizeFirstLetter(rawData.name),
  imageUrl: rawData.sprites.other['official-artwork'].front_default,
  types: rawData.types.map(t => t.type.name),
  height: rawData.height,
  weight: rawData.weight,
});
```

**5. Utilidades (Helper Functions)**
- ✅ Funciones puras
- ✅ Sin efectos secundarios
- ✅ Reutilizables
- ❌ No hacer fetch
- ❌ No acceder a estado

**Flujo de Datos (Unidireccional)**
```
API (PokeAPI)
   ↓
Service (fetchPokemonList)
   ↓
Hook (usePokemon) → Normalizer (normalizePokeData)
   ↓
Componente (PokemonCard) → renderizar props
```

---

## 🎨 Metodología BEM (Block Element Modifier)

### Estructura de Clases CSS
```
.pokedex {}
.pokedex__header {}
.pokedex__body {}
.pokedex__body--active {}

.pokemon-card {}
.pokemon-card__image {}
.pokemon-card__info {}
.pokemon-card__title {}
.pokemon-card__type {}
.pokemon-card__type--fire {}
.pokemon-card__type--water {}

.pagination {}
.pagination__button {}
.pagination__button--active {}
.pagination__button--disabled {}
```

### Ventajas
- Reutilización de componentes
- Especificidad predecible
- Mantenibilidad mejorada
- Escalabilidad

---

## 💡 Principios de Clean Code

### 1. **Nombres Significativos**
- ✅ `fetchPokemonsByPage(pageNumber)`
- ❌ `fp(p)`

### 2. **Funciones Pequeñas y Enfocadas**
- Una responsabilidad por función
- Máximo 3-4 parámetros
- Reutilizable y testeable

### 3. **Manejo de Errores**
- Try-catch en llamadas a API
- Mensajes de error amigables
- Fallback graceful

### 4. **Código Documentado**
```javascript
/**
 * Obtiene una lista de Pokémon paginada desde PokeAPI
 * @param {number} offset - Número de registros a saltar
 * @param {number} limit - Cantidad de registros a obtener
 * @returns {Promise<Array>} Promise con array de Pokémon normalizado
 */
export const fetchPokemonsByPage = async (offset, limit) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    if (!response.ok) throw new Error('Error al obtener Pokémon');
    const data = await response.json();
    return data.results.map(pokemon => normalizePokeData(pokemon));
  } catch (error) {
    console.error('Error en fetchPokemonsByPage:', error);
    throw error;
  }
};
```

---

## 🚀 Metodologías de Desarrollo

### YAGNI (You Aren't Gonna Need It)
- ❌ No implementar features "por si acaso"
- ✅ Solamente lo requerido en la especificación
- ✅ Refactorizar cuando sea necesario

**Ejemplos a EVITAR**:
- Sistema de autorización (no incluido)
- Base de datos local (innecesario)
- Admin panel (fuera del alcance)

### KISS (Keep It Simple, Stupid)
- Soluciones simples y directas
- Evitar sobre-ingeniería
- Código legible sobre código "clever"

**Ejemplo**:
```javascript
// ✅ KISS - Simple y claro
const filterByType = (pokemonList, type) => 
  pokemonList.filter(pokemon => pokemon.types.includes(type));

// ❌ Sobre-complicado
const filterByType = (pokemonList, type) =>
  pokemonList.reduce((acc, p) => [...acc, ...p.types.includes(type) ? [p] : []], []);
```

### DRY (Don't Repeat Yourself)
- Reutilizar código mediante componentes, hooks y utilidades
- Crear funciones helper para lógica repetida
- Evitar copiar-pegar

**Estructura de Utilidades**:
```javascript
// utils/formatters.js
export const formatPokemonName = (name) => 
  name.charAt(0).toUpperCase() + name.slice(1);

export const formatTypeColor = (type) => {
  const typeColors = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
  };
  return typeColors[type] || '#A8A878';
};
```

---

## 📋 Checklist de Legibilidad

- [ ] Nombres de variables claros y descriptivos
- [ ] Máximo 80 caracteres por línea
- [ ] Funciones cortas (máximo 20-30 líneas)
- [ ] Comentarios solo donde sea necesario (código auto-descriptivo)
- [ ] Indentación consistente (2 espacios)
- [ ] Imports organizados (librerías, componentes, utils)
- [ ] Archivo `.prettierrc` para formato consistente
- [ ] ESLint configurado
- [ ] Sin variables globales innecesarias
- [ ] Props desestructuradas en componentes

---

## 🛠️ Estándares de Código ES6+

### Características a Utilizar
- `const` y `let` (nunca `var`)
- Arrow functions `=>`
- Template literals `` `uso de variables: ${var}` ``
- Destructuring de objetos y arrays
- Spread operator `...`
- Métodos de array moderno (`map`, `filter`, `reduce`)
- `async/await` en lugar de `.then()`

### Ejemplo Completo (JavaScript ES6+)
```javascript
// ✅ Código moderno y legible
const fetchAndDisplayPokemon = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();
    
    const { name, types } = pokemon;
    const normalizedPokemon = normalizePokeData(pokemon);
    const typesList = normalizedPokemon.types.join(', ');
    
    console.log(`${name.toUpperCase()} - Tipos: ${typesList}`);
  } catch (error) {
    console.error('Error cargando Pokémon:', error);
  }
};
```

---

## 📊 Estructura de Datos y Normalización de Contrato

### Contrato de Datos esperado (después de normalizar)
```javascript
// Estructura normalizada que usa la aplicación
const pokemonContrato = {
  id: 1,                                    // number
  name: 'Bulbasaur',                       // string (capitalizado)
  imageUrl: 'https://...',                 // string (URL)
  types: ['grass', 'poison'],              // Array<string>
  height: 7,                               // number (decímetros)
  weight: 69,                              // number (hectogramos)
  stats: {
    hp: 45,                                // number
    attack: 49,                            // number
    defense: 49,                           // number
    spAtk: 65,                             // number
    spDef: 65,                             // number
    speed: 45,                             // number
  },
  abilities: ['overgrow'],                 // Array<string>
};
```

### Normalización de Contrato (PokeAPI → App)
```javascript
// normalizers/pokemonNormalizer.js

/**
 * Transforma datos brutos de PokeAPI al contrato de la aplicación
 * @param {Object} rawPokemon - Datos crudos de PokeAPI
 * @returns {Object} Pokémon normalizado
 */
export const normalizePokeData = (rawPokemon) => {
  if (!rawPokemon) return null;

  return {
    id: rawPokemon.id,
    name: capitalizeFirstLetter(rawPokemon.name),
    imageUrl: rawPokemon.sprites?.other?.['official-artwork']?.front_default 
      || rawPokemon.sprites?.front_default,
    types: rawPokemon.types?.map(t => t.type.name) || [],
    height: rawPokemon.height,
    weight: rawPokemon.weight,
    stats: normalizeStats(rawPokemon.stats),
    abilities: normalizeAbilities(rawPokemon.abilities),
  };
};

/**
 * Normaliza el array de estadísticas
 * @param {Array} rawStats - Stats crudos de PokeAPI
 * @returns {Object} Stats reestructurados
 */
const normalizeStats = (rawStats = []) => {
  const statMap = {};
  rawStats.forEach(stat => {
    const statName = stat.stat.name.replace('-', ''); // ex: 'sp-atk' -> 'spAtk'
    statMap[statName] = stat.base_stat;
  });
  return statMap;
};

/**
 * Normaliza el array de habilidades
 * @param {Array} rawAbilities - Abilities crudas de PokeAPI
 * @returns {Array} Nombres de habilidades
 */
const normalizeAbilities = (rawAbilities = []) => 
  rawAbilities.map(ability => ability.ability.name);

/**
 * Capitaliza la primera letra
 * @param {string} text - Texto a capitalizar
 * @returns {string} Texto capitalizado
 */
const capitalizeFirstLetter = (text) => 
  text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
```

### Ventajas de Normalizar
- ✅ Datos consistentes en toda la app
- ✅ Fácil cambiar estructura sin refactorizar componentes
- ✅ Separación entre API y lógica interna
- ✅ Facilita testing
- ✅ Mejor mantenibilidad

---

## ⚡ Optimizaciones Recomendadas

- **Caché**: Almacenar datos de Pokémon consultados
- **Lazy Loading**: Cargar imágenes bajo demanda
- **Debounce**: Búsqueda con delay
- **React.memo**: Para componentes que no cambian frecuentemente
- **useMemo/useCallback**: Para cálculos costosos

---

## 📐 Estructura de Componentes Recomendada (JavaScript)

### Componente Presentación (Solo UI)
```javascript
// components/PokemonCard/PokemonCard.jsx
import React from 'react';
import styles from './PokemonCard.module.css';
import { formatTypeColor } from '../../utils/formatters';

/**
 * Renderiza una tarjeta de Pokémon
 * Responsabilidad: Mostrar datos, disparar eventos
 */
const PokemonCard = ({ pokemon, onClick }) => {
  const { id, name, imageUrl, types } = pokemon;

  const handleClick = () => onClick(id);

  return (
    <article 
      className={styles.pokemonCard}
      onClick={handleClick}
      role="button"
      tabIndex="0"
    >
      <div className={styles.pokemonCard__image}>
        <img 
          src={imageUrl} 
          alt={name}
          loading="lazy"
        />
      </div>
      
      <h2 className={styles.pokemonCard__name}>{name}</h2>
      
      <div className={styles.pokemonCard__types}>
        {types.map(type => (
          <span 
            key={type}
            className={styles.pokemonCard__type}
            style={{ backgroundColor: formatTypeColor(type) }}
          >
            {type}
          </span>
        ))}
      </div>
    </article>
  );
};

export default PokemonCard;
```

### Estilos BEM
```css
/* components/PokemonCard/PokemonCard.module.css */
.pokemonCard {
  display: flex;
  flex-direction: column;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  background: #fff;
}

.pokemonCard:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.pokemonCard__image {
  width: 100%;
  height: 150px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 8px;
}

.pokemonCard__image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.pokemonCard__name {
  font-size: 16px;
  font-weight: 600;
  margin: 8px 0;
  text-align: center;
}

.pokemonCard__types {
  display: flex;
  gap: 6px;
  justify-content: center;
  flex-wrap: wrap;
}

.pokemonCard__type {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  color: white;
  font-weight: 500;
}
```

### Hook con Lógica de Negocio
```javascript
// hooks/usePokemon.js
import { useState, useEffect } from 'react';
import { fetchPokemonList } from '../services/pokeApi';
import { normalizePokeData } from '../normalizers/pokemonNormalizer';

/**
 * Hook que maneja la lógica de obtener Pokémon
 * Responsabilidad: Estado, fetch, normalización
 */
export const usePokemon = (page = 1, limit = 20) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(null);

        const offset = (page - 1) * limit;
        const data = await fetchPokemonList(offset, limit);

        // Normalizar cada Pokémon
        const normalized = data.results.map(pokemon => 
          normalizePokeData(pokemon)
        );

        setPokemonList(normalized);
        setTotalCount(data.count);
      } catch (err) {
        setError(err.message || 'Error cargando Pokémon');
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [page, limit]);

  return {
    pokemonList,
    loading,
    error,
    totalCount,
  };
};
```

---

## ⚙️ Configuración Importante con Vite

### Hot Module Replacement (HMR)
- Vite incluye HMR automático para desarrollo sin necesidad de recargar
- Los cambios en componentes se reflejan instantáneamente
- El estado se mantiene durante el desarrollo

### Import de Rutas Estáticas
- Usar rutas relativas dentro de `src/` (ej: `../services/pokeApi`)
- Configurar alias opcional en `vite.config.js` si es necesario
- Los CSS Modules se importan automáticamente

### Build y Deployabilidad
- `npm run build` genera archivos optimizados en `dist/`
- Listo para desplegar en cualquier servidor estático (Vercel, Netlify, GitHub Pages)
- Incluye minificación y code splitting automático

---

## 🧪 Testing (Opcional pero Recomendado)

- Vitest (compatible con Vite) para unit tests
- React Testing Library para componentes
- Cobertura mínima del 70%

---

## 📦 Dependencias Esenciales

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0"
  }
}
```

### Configuración Vite (vite.config.js)
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
```

### Punto de Entrada HTML (index.html)
```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pokédex - Descubre todos los Pokémon</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### Punto de Entrada React (src/main.jsx)
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Scripts en package.json
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .jsx,.js"
  }
}
```

### Configuración ESLint (.eslintrc.cjs)
```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};
```

### Configuración Prettier (.prettierrc)
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2
}
```

---

## 🎯 Objetivos de Calidad

1. **Legibilidad**: Código fácil de entender a primera vista
2. **Mantenibilidad**: Fácil modificar y extender
3. **Reutilización**: Componentes y lógica reutilizable
4. **Performance**: Carga eficiente, sin renders innecesarios
5. **Accesibilidad**: WCAG 2.1 AA (basic)
6. **Escalabilidad**: Arquitectura preparada para crecer

---

## 🚫 Lo que NO se incluye

- Backend propio
- Base de datos
- Autenticación de usuarios
- Sistema de favoritos persistente
- Aplicación móvil nativa
- PWA avanzada

---

## ✅ Criterios de Aceptación

- [ ] Aplicación funciona sin errores en consola
- [ ] Paginación navega correctamente
- [ ] Imágenes cargan desde PokeAPI
- [ ] Código sigue BEM, Clean Code, YAGNI, KISS, DRY
- [ ] Separación de responsabilidades clara
- [ ] Datos normalizados desde PokeAPI
- [ ] Responsiva en desktop y tablet
- [ ] Tiempo de respuesta < 2s
- [ ] Documentación clara en el código
- [ ] Sin errores de ESLint
- [ ] Variables con const/let únicamente
- [ ] Funciones con máximo 30 líneas
- [ ] Componentes con máximo 3 responsabilidades

## 🔍 Checklist de Separación de Responsabilidades

- [ ] **Componentes**: Solo renderización, sin lógica de negocio
- [ ] **Hooks**: Manejo de estado y efectos, sin JSX
- [ ] **Services**: Llamadas API, sin acceso a React
- [ ] **Normalizers**: Transformación de datos, funciones puras
- [ ] **Utils**: Funciones helper sin estado
- [ ] **Flujo unidireccional**: API → Service → Hook → Normalizer → Componente
- [ ] **Props apropiadas**: Solo datos necesarios en cada componente
- [ ] **Callbacks claros**: onClick, onSubmit, onError bien nombrados

---

## 📚 Referencias

- [Next.js Documentation](https://nextjs.org/docs)
- [PokeAPI Documentation](https://pokeapi.co/docs/v2)
- [React Best Practices](https://react.dev)
- [BEM Naming Convention](http://getbem.com)
- [Clean Code by Robert C. Martin](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
