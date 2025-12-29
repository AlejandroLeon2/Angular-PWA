import { Router } from "express";
import { listNotesHandler, createNoteHandler, deleteNoteHandler } from "../controllers/notes.controller";

const router = Router();

router.get("/notes", listNotesHandler);
router.post("/notes", createNoteHandler);
router.delete("/notes/:id", deleteNoteHandler);

export default router;
