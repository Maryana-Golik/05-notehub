import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import { fetchNotes } from '../../services/noteService';
import type { FetchNotesResponse } from '../../types/note';

import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import css from './App.module.css';

export default function App() {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = useDebouncedCallback((value: string) => {
    setCurrentPage(1);
    setSearchQuery(value.trim());
  }, 500);

  const { data, isLoading, isError, isSuccess } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', currentPage, searchQuery],
    queryFn: ({ signal }) =>
      fetchNotes({ page: currentPage, perPage: 12, search: searchQuery, signal }),
    placeholderData: keepPreviousData,
  });


 const items =
  (data as any)?.items ??
  (data as any)?.notes ??
  [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          search={searchInput}
          onSearch={(v) => {
            setSearchInput(v);
            handleSearch(v);
          }}
        />

        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}

        <button
          type="button"
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}

      {isError && <ErrorMessage message="Failed to load notes" />}

      {isSuccess && items.length > 0 && <NoteList notes={items} />}

      {isSuccess && items.length === 0 && (
        <ErrorMessage message="No matching notes found" />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

