import axios, { AxiosResponse } from 'axios';
import type { FetchNotesResponse, Note, NoteTag } from '../types/note';

const api = axios.create({ baseURL: 'https://notehub-public.goit.study/api' });

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN as string | undefined;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  signal?: AbortSignal;
}

export async function fetchNotes(
  { page = 1, perPage = 12, search = '', signal }: FetchNotesParams
): Promise<FetchNotesResponse> {
  const res: AxiosResponse<FetchNotesResponse> = await api.get('/notes', {
    params: { page, perPage, search },
    signal,
  });
  return res.data;
}

export interface CreateNoteDto {
  title: string;
  content?: string;
  tag: NoteTag;
}

export async function createNote(body: CreateNoteDto, signal?: AbortSignal): Promise<Note> {
  const res: AxiosResponse<Note> = await api.post('/notes', body, { signal });
  return res.data;
}

export async function deleteNote(id: string, signal?: AbortSignal): Promise<Note> {
  const res: AxiosResponse<Note> = await api.delete(`/notes/${id}`, { signal });
  return res.data;
}

