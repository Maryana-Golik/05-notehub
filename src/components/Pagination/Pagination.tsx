import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      onPageChange={({ selected }) => setCurrentPage(selected + 1)}
      pageRangeDisplayed={2}
      pageCount={totalPages}
      marginPagesDisplayed={1}
      previousLabel="←"
      renderOnZeroPageCount={null}
      containerClassName={css.pagination}
      activeClassName={css.active}
      forcePage={currentPage - 1}
    />
  );
}