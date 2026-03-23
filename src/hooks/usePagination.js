import { useSearchParams } from 'react-router-dom';

/**
 * Hook para manejar la paginación sincronizada con la URL (?page=N).
 * Responsabilidad: leer y escribir la página actual en los query params.
 *
 * @returns {{ currentPage: number, goToPage: (page: number) => void }}
 */
export const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const goToPage = (page) => {
    setSearchParams({ page: String(page) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { currentPage, goToPage };
};
