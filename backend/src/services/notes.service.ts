import { client } from "../config/db";
import type{ Note } from "../models/note.model";

export async function getNotes(): Promise<Note[]> {
  const res = await client.query("SELECT * FROM notes ORDER BY id DESC");
  return res.rows;
}

export async function createNote(note: Note): Promise<Note> {
  const res = await client.query(
    "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
    [note.title, note.content]
  );
  return res.rows[0];
}

export async function deleteNote(id: number): Promise<void> {
  await client.query("DELETE FROM notes WHERE id = $1", [id]);
}
