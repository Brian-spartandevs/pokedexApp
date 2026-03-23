# 🔴 Pokédex Web Application

> Una aplicación web interactiva inspirada en el icónico dispositivo Pokédex del universo Pokémon. Explora más de 1,000 Pokémon con una interfaz temática, animaciones fluidas y datos en tiempo real desde la PokéAPI.

![Pokédex Preview](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.95.1-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Material UI](https://img.shields.io/badge/Material_UI-6.5.0-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 🎯 Pitch del Proyecto

**Pokédex App** es una Single Page Application (SPA) moderna que consume la [PokéAPI](https://pokeapi.co/) para ofrecer una experiencia interactiva de exploración de Pokémon. Con un diseño fiel al dispositivo Pokédex clásico, la aplicación incluye:

- ✅ **Navegación paginada** con 20 Pokémon por página
- ✅ **Caché inteligente** para evitar peticiones duplicadas
- ✅ **Interfaz temática** con animaciones personalizadas
- ✅ **Carga de datos optimizada** con TanStack Query
- ✅ **Componentes reutilizables** de Material UI integrados con CSS personalizado

---

## 🏗️ Stack Tecnológico

### **Frontend Core**
- **React** `18.2.0` - Librería UI con componentes funcionales y hooks
- **JavaScript (ES6+)** - Sin TypeScript, código moderno y legible
- **Vite** `5.0.0` - Build tool ultrarrápido con HMR
- **React Router DOM** `6.20.0` - Navegación SPA con rutas dinámicas

### **Gestión de Estado y Datos**
- **TanStack Query (React Query)** `5.95.1` - Gestión de estado servidor con caché automático
- **Fetch API nativa** - Sin Axios, usando `fetch` nativo del navegador

### **UI y Estilos**
- **Material UI (MUI)** `6.5.0` - Componentes de diseño (Button, Typography, Chip, Container, etc.)
- **Emotion** `11.14.0` - CSS-in-JS requerido por MUI
- **CSS Modules + BEM** - Estilos personalizados con metodología BEM para componentes
- **Google Fonts (Nunito)** - Tipografía moderna

### **Código y Calidad**
- **ESLint** `8.55.0` - Linter para código JavaScript
- **Prettier** `3.1.0` - Formateador de código

### **API Externa**
- **PokeAPI** - API REST pública con información de 1,000+ Pokémon

---

## 📦 Instalación

### **Prerrequisitos**
- Node.js `>=16.0.0`
- npm `>=8.0.0`

### **Pasos de Instalación**

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/pokedex-app.git
   cd pokedex-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

   Esto instalará:
   - React 18.2.0 + React DOM
   - TanStack Query 5.95.1
   - Material UI 6.5.0 + Emotion (peer dependencies)
   - React Router DOM 6.20.0
   - Vite 5.0.0 (dev)

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en: `http://localhost:5173/`

4. **Compilar para producción**
   ```bash
   npm run build
   ```
   Los archivos compilados estarán en la carpeta `dist/`

5. **Preview de producción**
   ```bash
   npm run preview
   ```

### **Scripts Disponibles**
```json
{
  "dev": "vite",              // Servidor de desarrollo
  "build": "vite build",      // Compilar para producción
  "preview": "vite preview",  // Preview de build
  "lint": "eslint src --ext .jsx,.js"  // Linter
}
```

---

## 🗂️ Estructura del Proyecto

```
pokedex/
├── index.html                    # Punto de entrada HTML
├── vite.config.js                # Configuración Vite
├── package.json
├── src/
│   ├── main.jsx                  # Entry point React + QueryClientProvider
│   ├── App.jsx                   # Componente raíz con React Router
│   │
│   ├── components/
│   │   ├── common/
│   │   │   └── Header/           # Cabecera con LEDs decorativos
│   │   ├── Pokedex/              # Contenedor principal con grid
│   │   ├── PokemonCard/          # Tarjeta individual de Pokémon
│   │   ├── PokemonDetail/        # Vista detallada de Pokémon
│   │   └── Pagination/           # Controles de paginación
│   │
│   ├── pages/
│   │   ├── PokedexPage.jsx       # Vista del listado (conecta hooks)
│   │   └── PokemonDetailPage.jsx # Vista de detalle
│   │
│   ├── hooks/
│   │   ├── usePokemon.js         # Hook con useQuery para lista
│   │   ├── usePokemonDetail.js   # Hook con useQuery para detalle
│   │   └── usePagination.js      # Hook para sincronizar URL con página
│   │
│   ├── services/
│   │   ├── pokeApi.js            # Funciones fetch originales (legacy)
│   │   └── pokemonService.js     # Servicios para TanStack Query
│   │
│   ├── normalizers/
│   │   └── pokemonNormalizer.js  # Transformación de datos PokeAPI
│   │
│   ├── utils/
│   │   ├── constants.js          # Constantes (tipos, colores, límites)
│   │   └── formatters.js         # Funciones de formato (nombres, IDs)
│   │
│   ├── config/
│   │   └── api.js                # BASE_URL de PokeAPI
│   │
│   └── styles/
│       └── global.css            # Estilos globales + CSS variables
│
└── dist/                         # Carpeta de build (generada)
```

---

## 🧠 Arquitectura de Datos: TanStack Query

### **¿Por Qué TanStack Query?**

La aplicación utiliza **TanStack Query v5** para eliminar la gestión manual de estado con `useState` y `useEffect`. Esto proporciona:

1. **Caché Automático**: Las peticiones se almacenan en caché por 5 minutos (`staleTime`)
2. **Deduplicación**: Múltiples componentes pidiendo los mismos datos = 1 sola petición
3. **Background Refetching**: Actualización silenciosa de datos obsoletos
4. **Loading/Error States**: Estados gestionados automáticamente por `useQuery`

### **Flujo de Datos**

```
Usuario navega a página 1
    ↓
usePokemon(1) llama a useQuery
    ↓
TanStack Query verifica caché
    ↓
┌─────────────────┬──────────────────┐
│  Dato en caché  │  Dato no existe  │
│  (< 5 min)      │  o obsoleto      │
├─────────────────┼──────────────────┤
│  Devuelve       │  Ejecuta         │
│  inmediatamente │  getPokemonList  │
│                 │  (fetch nativo)  │
│                 │        ↓         │
│                 │  Guarda en caché │
└─────────────────┴──────────────────┘
         ↓
  Componente renderiza
  con datos normalizados
```

### **Ejemplo de Implementación**

**Antes (Manual con useEffect):**
```javascript
// ❌ Mucho código, sin caché
const [pokemonList, setPokemonList] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const loadPokemon = async () => {
    try {
      setLoading(true);
      const data = await fetch(url);
      setPokemonList(await data.json());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  loadPokemon();
}, [page]);
```

**Después (TanStack Query):**
```javascript
// ✅ Código limpio, caché automático
const { data, isLoading, error } = useQuery({
  queryKey: ['pokemon', 'list', page],
  queryFn: () => getPokemonListWithDetails(page),
  staleTime: 5 * 60 * 1000, // 5 minutos
});
```

### **Configuración del QueryClient**

En `src/main.jsx`:
```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // Datos frescos por 5 minutos
      gcTime: 10 * 60 * 1000,         // Mantener en caché 10 minutos
      retry: 1,                        // Reintentar 1 vez en errores
      refetchOnWindowFocus: false,    // No refetch al cambiar de pestaña
    },
  },
});
```

### **Servicios con Fetch Nativo**

> ⚠️ **IMPORTANTE**: Este proyecto **NO usa Axios**. Todas las peticiones HTTP se realizan con la **Fetch API nativa** del navegador.

**Ejemplo: `src/services/pokemonService.js`**
```javascript
export const getPokemonListWithDetails = async (page) => {
  const offset = (page - 1) * POKEMON_PER_PAGE;

  // 1. Fetch nativo con manejo manual de respuesta
  const listResponse = await fetch(
    `${API_BASE_URL}/pokemon?offset=${offset}&limit=${POKEMON_PER_PAGE}`
  );

  if (!listResponse.ok) {
    throw new Error('Error al obtener la lista de Pokémon');
  }

  const listData = await listResponse.json(); // ← .json() manual

  // 2. Obtener detalles en paralelo
  const detailsPromises = listData.results.map(async (item) => {
    const detailResponse = await fetch(`${API_BASE_URL}/pokemon/${item.id}`);
    const detailData = await detailResponse.json();
    return normalizePokeData(detailData);
  });

  const pokemonList = await Promise.all(detailsPromises);

  return { pokemonList, totalCount: listData.count };
};
```

---

## 🎨 Integración de Material UI con Custom CSS

### **Filosofía de Diseño**

Este proyecto combina lo mejor de dos mundos:

- **Material UI v6**: Componentes base (`Button`, `Typography`, `Chip`, `Container`, `Box`)
- **Custom CSS Modules + BEM**: Estilos personalizados para mantener la identidad visual Pokédex

### **¿Cómo se Integran?**

Los componentes de MUI **respetan** las clases CSS personalizadas:

```javascript
// PokemonCard.jsx
import { Typography, Chip, Box } from '@mui/material';
import styles from './PokemonCard.module.css';

<Box className={styles.pokemonCard__body}>
  <Typography 
    variant="h6" 
    component="h3" 
    className={styles.pokemonCard__name} // ← Custom CSS aplicado
  >
    {name}
  </Typography>

  <Chip
    label={type}
    className={styles.pokemonCard__type} // ← Custom CSS aplicado
    sx={{
      backgroundColor: formatTypeColor(type), // ← Solo color dinámico
      fontWeight: 700,
    }}
  />
</Box>
```

### **Componentes MUI Usados**

| Componente | Uso | Custom CSS |
|------------|-----|------------|
| `<Container>` | Centrado responsivo del contenido | ✅ Mantiene layout |
| `<Typography>` | Textos con semántica HTML correcta | ✅ `className` aplicado |
| `<Chip>` | Badges de tipos de Pokémon | ✅ `className` + `sx` para colores |
| `<Button>` | Botones de paginación y navegación | ✅ `className` aplicado |
| `<Box>` | Reemplazo semántico de `<div>` | ✅ `className` aplicado |

### **Estado de Carga: Pokébola Animada 🔴**

> ⚠️ **PROHIBIDO**: Este proyecto **NO usa Skeletons** de Material UI.

El estado de carga se representa con una **animación CSS personalizada** de una Pokébola girando:

```css
/* Pokedex.module.css */
.pokedex__spinner {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(#cc0000 50%, #f0f0f0 50%);
  position: relative;
  animation: pokeSpin 0.85s linear infinite;
}

.pokedex__spinner::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid #222;
  box-shadow: inset 0 0 0 3px white;
}

@keyframes pokeSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

**Implementación en componente:**
```javascript
{isLoading && (
  <div className={styles.pokedex__status}>
    <div className={styles.pokedex__spinner} role="status" />
    <Typography className={styles.pokedex__loadingText}>
      Buscando Pokémon…
    </Typography>
  </div>
)}
```

---

## 🚀 Características Clave

### **1. Paginación Inteligente**
- 20 Pokémon por página
- Navegación con botones prev/next y números de página
- URL sincronizada con el estado: `/?page=3`
- Controles deshabilitados en límites (primera/última página)

### **2. Tarjetas de Pokémon**
Cada tarjeta incluye:
- Imagen oficial de alta calidad
- Número de Pokédex (#001, #025, etc.)
- Nombre capitalizado
- Badges de tipos con colores personalizados
- Barra de HP con animación
- **Efecto hover**: Elevación + glow con color del tipo primario

### **3. Vista de Detalle**
Al hacer clic en una tarjeta:
- Hero banner coloreado según tipo primario
- Imagen destacada con sombra
- Información física: altura y peso
- Estadísticas completas (HP, ATK, DEF, SP.ATK, SP.DEF, SPD)
- Lista de habilidades
- Botón "Volver" pill-shaped

### **4. Diseño Temático Pokédex**
- Header con LEDs decorativos (azul grande + rojo/amarillo/verde)
- Pantalla LCD oscura con efecto scanlines
- Panel de controles rojo degradado
- Grid de 5 columnas responsivo (4→3→2 en breakpoints)
- Animación de entrada escalonada en tarjetas

### **5. Normalización de Datos**
Los datos de PokeAPI se transforman a un contrato interno:
```javascript
{
  id: 1,
  name: "Bulbasaur",
  imageUrl: "https://...",
  types: ["grass", "poison"],
  stats: { hp: 45, attack: 49, defense: 49, ... },
  abilities: ["overgrow", "chlorophyll"],
  height: 7,  // decímetros
  weight: 69, // hectogramos
}
```

---

## 📚 Metodologías y Principios

### **Separación de Responsabilidades**

```
┌─────────────────────────────────────────┐
│  📄 Pages (Vista)                       │  ← Orquesta hooks y pasa props
│  PokedexPage.jsx, PokemonDetailPage.jsx│
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  🎣 Hooks (Lógica)                      │  ← useQuery, estado, efectos
│  usePokemon.js, usePokemonDetail.js    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  🌐 Services (Data Access)              │  ← Fetch nativo, transformación
│  pokemonService.js                      │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  🔧 Normalizers (Data Transform)        │  ← Contrato interno
│  pokemonNormalizer.js                   │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  🎨 Components (Presentación)           │  ← Solo JSX, reciben props
│  Pokedex, PokemonCard, PokemonDetail   │
└─────────────────────────────────────────┘
```

### **Principios Aplicados**

#### **YAGNI (You Aren't Gonna Need It)**
- ❌ No hay sistema de autenticación (innecesario)
- ❌ No hay favoritos persistentes (fuera de alcance)
- ✅ Solo lo especificado: listado + detalle + paginación

#### **KISS (Keep It Simple, Stupid)**
- Fetch nativo en lugar de librerías complejas
- CSS Modules en lugar de styled-components
- TanStack Query con configuración mínima

#### **DRY (Don't Repeat Yourself)**
- Utilidades reutilizables: `formatters.js`, `constants.js`
- Componentes comunes: `Header`, `Pagination`
- Normalización centralizada: `pokemonNormalizer.js`

#### **BEM (Block Element Modifier)**
Metodología de nombres de clases CSS:
```css
.pokemonCard {}                     /* Block */
.pokemonCard__header {}             /* Element */
.pokemonCard__header--active {}     /* Modifier */
```

---

## 🛠️ Comandos de Desarrollo

```bash
# Desarrollo con Hot Module Replacement
npm run dev

# Compilar para producción (minificado + tree-shaking)
npm run build

# Preview del build de producción
npm run preview

# Ejecutar linter
npm run lint

# Formatear código con Prettier
npx prettier --write src/
```

---

## 📊 Ventajas de la Arquitectura Actual

### **Comparativa: Antes vs. Después**

| Aspecto | Fase 1 (Inicial) | Fase 2 (Actual) |
|---------|------------------|------------------|
| **Gestión de estado** | `useState` + `useEffect` manual | TanStack Query automático |
| **Código por hook** | ~50 líneas | ~15 líneas |
| **Caché** | Sin caché | Caché inteligente de 5 min |
| **Loading state** | `setLoading(true/false)` manual | `isLoading` automático |
| **Error handling** | Try-catch manual | TanStack Query lo gestiona |
| **Peticiones duplicadas** | Sin control | Deduplicación automática |
| **UI Library** | HTML + CSS puro | Material UI v6 + Custom CSS |
| **Fetch method** | ✅ Fetch nativo | ✅ Fetch nativo (sin cambios) |
| **Loading animation** | ✅ Pokébola CSS | ✅ Pokébola CSS (sin cambios) |

---

## 🔮 Posibles Mejoras Futuras

- [ ] **React Query DevTools**: Visualizar estado de caché en desarrollo
- [ ] **Prefetching**: Cargar páginas adyacentes en background
- [ ] **Infinite Scroll**: Implementar con `useInfiniteQuery`
- [ ] **Búsqueda por nombre**: Input de búsqueda con debounce
- [ ] **Filtro por tipo**: Dropdown para filtrar Pokémon por tipo
- [ ] **PWA**: Service Worker para modo offline
- [ ] **Favoritos**: Persistencia en LocalStorage con `useMutation`

---

## 📜 Licencia

Este proyecto es de código abierto bajo la licencia MIT.

---

## 🙏 Créditos

- **PokéAPI**: [https://pokeapi.co/](https://pokeapi.co/)
- **React**: [https://react.dev/](https://react.dev/)
- **TanStack Query**: [https://tanstack.com/query](https://tanstack.com/query)
- **Material UI**: [https://mui.com/](https://mui.com/)
- **Vite**: [https://vitejs.dev/](https://vitejs.dev/)

---

# 📖 Historia del Proyecto / Especificaciones Originales

<details>
<summary><strong>🔽 Ver Especificaciones de la Fase 1 (Proyecto Original)</strong></summary>

---

## 📋 Especificación Original: Pokédex Web Application

### **Objetivo Inicial**

Desarrollo de una aplicación web **Pokédex** interactiva que consume la **PokeAPI** y proporciona una experiencia de usuario temática similar al dispositivo Pokédex del universo Pokémon.

---

### **Stack Tecnológico Original (Fase 1)**

- **Build Tool**: Vite (generador de módulos ES)
- **Librería UI**: React 18+
- **Lenguaje**: JavaScript (ES6+) - SIN TypeScript
- **Router**: React Router v6
- **Gestor de paquetes**: npm
- **API Externa**: PokeAPI (https://pokeapi.co/)
- **Estilos**: CSS Modules con metodología BEM
- **Linting**: ESLint (sin tipos)
- **Formateo**: Prettier

> ⚠️ **Nota**: En la Fase 2 se añadieron TanStack Query v5 y Material UI v6.

---

### **Características Planificadas**

#### **1. Interfaz Temática Pokédex**
- Diseño visual inspirado en un dispositivo Pokédex clásico
- Paleta de colores rojo, blanco y negro
- Animaciones suaves y transiciones
- Pantalla LCD simulada con información del Pokémon
- Botones interactivos estilizados

#### **2. Sistema de Paginación**
- Listado de Pokémon con paginación
- Controles para navegar: anterior, siguiente, números de página
- Indicador visual de página actual
- Límite configurable de Pokémon por página (ej: 20 por página)
- URL amigable con parámetros de página (ej: `?page=1&limit=20`)
- Integración con React Router para navegación SPA

#### **3. Visualización de Pokémon**
Tarjeta de Pokémon con:
- Imagen oficial del Pokémon
- Número de Pokédex
- Nombre
- Tipos
- Estadísticas básicas

Detalle completo al hacer clic:
- Todos los tipos
- Estadísticas completas (HP, Ataque, Defensa, etc.)
- Habilidades
- Movimientos destacados

#### **4. Búsqueda y Filtrado (Opcional)**
- Búsqueda por nombre
- Filtrado por tipo de Pokémon
- Consultas optimizadas a PokeAPI

---

### **Arquitectura Original: Patrón Vista-Componente**

```
pokedex-vite/
├── index.html               # Punto de entrada HTML
├── vite.config.js           # Configuración Vite
├── package.json
├── src/
│   ├── main.jsx             # Punto de entrada React
│   ├── App.jsx              # Componente raíz
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── Button/
│   │   ├── Pokedex/         # Componente principal contenedor
│   │   ├── PokemonCard/     # Componente presentación de card
│   │   ├── PokemonDetail/   # Componente detalle
│   │   └── Pagination/      # Componente paginación
│   ├── pages/               # Vista (conectadas a rutas)
│   │   ├── PokedexPage.jsx
│   │   └── PokemonDetailPage.jsx
│   ├── services/
│   │   └── pokeApi.js       # Llamadas API (fetch manual)
│   ├── hooks/
│   │   ├── usePokemon.js    # useState + useEffect
│   │   └── usePagination.js
│   ├── normalizers/
│   │   └── pokemonNormalizer.js
│   ├── utils/
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   └── constants.js
│   ├── styles/
│   │   └── global.css
│   └── config/
│       └── api.js
└── dist/
```

---

### **Separación de Responsabilidades Original**

#### **1. Componentes (UI Layer)**
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

#### **2. Hooks Personalizados (Logic Layer) - ANTES**
```javascript
// ❌ Gestión manual con useState + useEffect
const usePokemon = (page) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const offset = (page - 1) * POKEMON_PER_PAGE;
        const listData = await fetchPokemonList(offset, POKEMON_PER_PAGE);
        
        const partialItems = listData.results.map(normalizePokemonListItem);
        const details = await Promise.all(
          partialItems.map((item) => fetchPokemonById(item.id))
        );

        setPokemonList(details.map(normalizePokeData));
        setTotalCount(listData.count);
      } catch (err) {
        setError(err.message || 'Error cargando Pokémon');
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [page]);

  return { pokemonList, loading, error, totalCount };
};
```

> 🚀 **En la Fase 2** se reemplazó por `useQuery` de TanStack Query, reduciendo el código a ~15 líneas.

#### **3. Servicios (Data Access Layer) - ORIGINAL**
```javascript
// ✅ Servicio puro con fetch nativo
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

> ⚠️ **Nota**: Este patrón se mantuvo en la Fase 2, solo se creó un nuevo archivo `pokemonService.js` que usa el mismo enfoque.

#### **4. Normalizadores (Data Transformation)**
```javascript
// ✅ Normalización de datos (sin cambios en Fase 2)
export const normalizePokeData = (rawData) => ({
  id: rawData.id,
  name: capitalizeFirstLetter(rawData.name),
  imageUrl: rawData.sprites.other['official-artwork'].front_default,
  types: rawData.types.map(t => t.type.name),
  height: rawData.height,
  weight: rawData.weight,
  stats: normalizeStats(rawData.stats),
  abilities: normalizeAbilities(rawData.abilities),
});
```

#### **5. Flujo de Datos Original (Unidireccional)**
```
API (PokeAPI)
   ↓
Service (fetchPokemonList) → fetch nativo
   ↓
Hook (usePokemon) → useState + useEffect
   ↓
Normalizer (normalizePokeData)
   ↓
Componente (PokemonCard) → renderizar props
```

---

### **Metodología BEM (Block Element Modifier)**

Estructura de clases CSS aplicada en el proyecto:
```css
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

**Ventajas:**
- Reutilización de componentes
- Especificidad predecible
- Mantenibilidad mejorada
- Escalabilidad

---

### **Principios de Clean Code (Fase 1)**

#### **1. Nombres Significativos**
- ✅ `fetchPokemonsByPage(pageNumber)`
- ❌ `fp(p)`

#### **2. Funciones Pequeñas y Enfocadas**
- Una responsabilidad por función
- Máximo 3-4 parámetros
- Reutilizable y testeable

#### **3. Manejo de Errores**
- Try-catch en llamadas a API
- Mensajes de error amigables
- Fallback graceful

#### **4. Código Documentado**
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

### **Metodologías Aplicadas**

#### **YAGNI (You Aren't Gonna Need It)**
- ❌ No implementar features "por si acaso"
- ✅ Solamente lo requerido en la especificación
- ✅ Refactorizar cuando sea necesario

**Ejemplos a EVITAR:**
- Sistema de autorización (no incluido)
- Base de datos local (innecesario)
- Admin panel (fuera del alcance)

#### **KISS (Keep It Simple, Stupid)**
- Soluciones simples y directas
- Evitar sobre-ingeniería
- Código legible sobre código "clever"

**Ejemplo:**
```javascript
// ✅ KISS - Simple y claro
const filterByType = (pokemonList, type) => 
  pokemonList.filter(pokemon => pokemon.types.includes(type));

// ❌ Sobre-complicado
const filterByType = (pokemonList, type) =>
  pokemonList.reduce((acc, p) => [...acc, ...p.types.includes(type) ? [p] : []], []);
```

#### **DRY (Don't Repeat Yourself)**
- Reutilizar código mediante componentes, hooks y utilidades
- Crear funciones helper para lógica repetida
- Evitar copiar-pegar

**Estructura de Utilidades:**
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

### **Checklist de Legibilidad Original**

- [x] Nombres de variables claros y descriptivos
- [x] Máximo 80 caracteres por línea
- [x] Funciones cortas (máximo 20-30 líneas)
- [x] Comentarios solo donde sea necesario (código auto-descriptivo)
- [x] Indentación consistente (2 espacios)
- [x] Imports organizados (librerías, componentes, utils)
- [x] Archivo `.prettierrc` para formato consistente
- [x] ESLint configurado
- [x] Sin variables globales innecesarias
- [x] Props desestructuradas en componentes

---

### **Estándares de Código ES6+ Originales**

#### **Características Utilizadas:**
- `const` y `let` (nunca `var`)
- Arrow functions `=>`
- Template literals `` `uso de variables: ${var}` ``
- Destructuring de objetos y arrays
- Spread operator `...`
- Métodos de array moderno (`map`, `filter`, `reduce`)
- `async/await` en lugar de `.then()`

#### **Ejemplo Completo (JavaScript ES6+):**
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

### **Configuración Importante con Vite (Fase 1)**

#### **Hot Module Replacement (HMR)**
- Vite incluye HMR automático para desarrollo sin necesidad de recargar
- Los cambios en componentes se reflejan instantáneamente
- El estado se mantiene durante el desarrollo

#### **Import de Rutas Estáticas**
- Usar rutas relativas dentro de `src/` (ej: `../services/pokeApi`)
- Configurar alias opcional en `vite.config.js` si es necesario
- Los CSS Modules se importan automáticamente

#### **Build y Deployabilidad**
- `npm run build` genera archivos optimizados en `dist/`
- Listo para desplegar en cualquier servidor estático (Vercel, Netlify, GitHub Pages)
- Incluye minificación y code splitting automático

---

### **Objetivos de Calidad (Fase 1)**

1. **Legibilidad**: Código fácil de entender a primera vista ✅
2. **Mantenibilidad**: Fácil modificar y extender ✅
3. **Reutilización**: Componentes y lógica reutilizable ✅
4. **Performance**: Carga eficiente, sin renders innecesarios ⚠️ (mejorado en Fase 2 con TanStack Query)
5. **Accesibilidad**: WCAG 2.1 AA (basic) ✅
6. **Escalabilidad**: Arquitectura preparada para crecer ✅

---

### **Criterios de Aceptación Originales**

- [x] Aplicación funciona sin errores en consola
- [x] Paginación navega correctamente
- [x] Imágenes cargan desde PokeAPI
- [x] Código sigue BEM, Clean Code, YAGNI, KISS, DRY
- [x] Separación de responsabilidades clara
- [x] Datos normalizados desde PokeAPI
- [x] Responsiva en desktop y tablet
- [x] Tiempo de respuesta < 2s
- [x] Documentación clara en el código
- [x] Sin errores de ESLint
- [x] Variables con const/let únicamente
- [x] Funciones con máximo 30 líneas
- [x] Componentes con máximo 3 responsabilidades

---

### **Referencias Originales**

- [PokeAPI Documentation](https://pokeapi.co/docs/v2)
- [React Best Practices](https://react.dev)
- [BEM Naming Convention](http://getbem.com)
- [Clean Code by Robert C. Martin](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
- [Vite Documentation](https://vitejs.dev/)

---

### **Evolución del Proyecto**

#### **Fase 1 (Original):**
- React 18 + JavaScript ES6+
- Vite como build tool
- React Router v6
- Fetch API nativo
- useState + useEffect manual
- CSS Modules + BEM
- Sin librerías de UI

#### **Fase 2 (Actual):**
- ✅ **Todo lo anterior +**
- TanStack Query v5 (gestión de estado servidor)
- Material UI v6 (componentes de UI)
- Caché inteligente de datos
- Código más limpio y mantenible
- Misma filosofía de diseño (fetch nativo, CSS personalizado)

---

</details>

---

<p align="center">
  Hecho con ❤️ y ☕ | Powered by <strong>PokéAPI</strong>
</p>
