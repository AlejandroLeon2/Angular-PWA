import { getNotes, createNote, deleteNote } from "../services/notes.service";
import type { Request,Response } from "express";

export async function listNotesHandler(req:Request, res:Response) {
  const notes = await getNotes();
  res.json(notes);
}

export async function createNoteHandler(req:Request, res:Response) {
  const { title, content } = req.body;
  const note = await createNote({ title, content });
  res.json(note);
}

export async function deleteNoteHandler(req:Request, res:Response) {
  const { id } = req.params;
  await deleteNote(Number(id));
  res.json({ message: "Nota eliminada" });
}
