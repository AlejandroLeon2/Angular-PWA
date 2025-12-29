import { Component, OnInit, effect, inject } from '@angular/core';
import { NetworkService } from '../../core/network.service';
import { NotesService } from '../../core/notes.service';
import { Note } from '../../core/models/note.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  network = inject(NetworkService);
  notesService = inject(NotesService);

  noteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.notesService.loadNotes();
    effect(() => {
      if (this.network.online()) {
        this.notesService.syncPending?.();
        this.notesService.loadNotes();
      }
    });
  }

  addNote() {
    if (this.noteForm.valid) {
      const note: Note = this.noteForm.value;
      this.notesService.createNote(note);
      this.noteForm.reset();
    }
  }

  deleteNote(idOrIndex: number) {
    this.notesService.deleteNote(idOrIndex as number);
  }
}
