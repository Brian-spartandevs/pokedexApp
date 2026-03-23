import { Button, Box } from '@mui/material';
import styles from './Pagination.module.css';

/**
 * Calcula el rango de páginas visibles alrededor de la página actual
 * @param {number} currentPage
 * @param {number} totalPages
 * @returns {number[]} Array de números de página visibles
 */
const getVisiblePages = (currentPage, totalPages) => {
  const delta = 2;
  const start = Math.max(1, currentPage - delta);
  const end = Math.min(totalPages, currentPage + delta);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

/**
 * Controles de paginación con botones anterior, numerados y siguiente.
 * Integración con Material UI v6 manteniendo estilos CSS propios.
 * 
 * Responsabilidad: renderizar la navegación entre páginas.
 *
 * @param {{ currentPage: number, totalPages: number, onPageChange: Function }}
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const visiblePages = getVisiblePages(currentPage, totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <Box 
      component="nav" 
      className={styles.pagination} 
      aria-label="Paginación de Pokémon"
    >
      <Button
        className={`${styles.pagination__button} ${isFirstPage ? styles['pagination__button--disabled'] : ''}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        aria-label="Página anterior"
        variant="text"
        size="small"
      >
        ←
      </Button>

      {visiblePages.map((page) => (
        <Button
          key={page}
          className={`${styles.pagination__button} ${
            page === currentPage ? styles['pagination__button--active'] : ''
          }`}
          onClick={() => onPageChange(page)}
          aria-label={`Página ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
          variant={page === currentPage ? 'contained' : 'text'}
          size="small"
        >
          {page}
        </Button>
      ))}

      <Button
        className={`${styles.pagination__button} ${isLastPage ? styles['pagination__button--disabled'] : ''}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        aria-label="Página siguiente"
        variant="text"
        size="small"
      >
        →
      </Button>
    </Box>
  );
};

export default Pagination;
