import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';
import { deleteNote } from '../../services/noteService';
import { useState } from 'react';
interface NoteListProps {
  notes: Note[];
}
export default function NoteList({ notes }: NoteListProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { mutate: deleteNoteMutation, isPending: isLoading } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      setActiveId(null);
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
  const handleDelete = (id: string) => {
    setActiveId(id);
    deleteNoteMutation(id);
  };
  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              onClick={() => handleDelete(note.id)}
              className={css.button}
            >
              {isLoading && activeId === note.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}