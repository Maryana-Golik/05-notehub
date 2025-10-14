import 'modern-normalize';
import { useState } from 'react';
import { fetchNotes } from '../../services/noteService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import SearchBox from '../SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ['notes', currentPage, searchQuery],
    queryFn: () => fetchNotes(currentPage, searchQuery),
    placeholderData: keepPreviousData,
  });
  const updateCarrentPage = (page: number) => {
    setCurrentPage(page);
  };
  const openModalWindow = () => {
    setIsOpen(true);
  };
  const closeModalWindow = () => {
    setIsOpen(false);
  };
  const totalPage = data?.totalPages ? data.totalPages : 0;
  const handleSearch = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
  }, 500);
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} searchQuery={searchQuery} />
        {isSuccess && totalPage > 1 && (
          <Pagination
            totalPages={totalPage}
            currentPage={currentPage}
            setCurrentPage={updateCarrentPage}
          />
        )}
        <button onClick={openModalWindow} className={css.button}>
          Create note +
        </button>
      </header>
      {isSuccess && data?.notes?.length > 0 && <NoteList notes={data.notes} />}
      {isLoading && <Loader />}
      {isOpen && <Modal onClose={closeModalWindow} />}
      {isError && (
        <ErrorMessage message="There was an error, please try again..." />
      )}
      {isSuccess && data?.notes?.length === 0 && (
        <ErrorMessage message="No matching notes found" />
      )}
    </div>
  );
}