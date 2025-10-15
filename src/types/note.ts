export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface FetchNotesResponse {
  items: Note[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}
export interface NewNote {
  title: string;
  content?: string;
  tag: NoteTag;
}
