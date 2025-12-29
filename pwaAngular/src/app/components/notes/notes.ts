import { Component, Input, signal } from '@angular/core';
import { Note } from '../../core/models/note.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './notes.html',
  styleUrls: ['./notes.css'],
})
export class NotesComponent {
  notes = signal<Note[]>([]);
  @Input() initialNotes: Note[] = [];

  noteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.notes.set(this.initialNotes);
  }

  addNote() {
    if (this.noteForm.valid) {
      const newNote: Note = this.noteForm.value;
      this.notes.update(list => [...list, newNote]);
      this.noteForm.reset();
    }
  }

  deleteNote(index: number) {
    this.notes.update(list => list.filter((_, i) => i !== index));
  }
}
