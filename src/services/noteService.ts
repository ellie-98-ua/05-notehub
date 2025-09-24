import axios from "axios";
import type { Note, CreateNoteInput } from "../types/note";

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api/notes";

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await axios.get<FetchNotesResponse>(BASE_URL, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    params: { page, perPage, search },
  });
  return data;
};

export const createNote = async (note: CreateNoteInput): Promise<Note> => {
  const { data } = await axios.post<Note>(BASE_URL, note, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return data;
};
