import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../core/models/note.model';
import { environment } from '../../environments/environment';
import { NetworkService } from './network.service';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private apiUrl = environment.API;
  notes = signal<Note[]>([]);
  http = inject(HttpClient);
  network = inject(NetworkService);

  loadNotes() {
    if (this.network.online()) {
      this.http.get<Note[]>(`${this.apiUrl}/notes`).subscribe(data => {
        this.notes.set(data);
        localStorage.setItem('notes', JSON.stringify(data)); 
      });
    } else {
      const cached = localStorage.getItem('notes');
      if (cached) {
        this.notes.set(JSON.parse(cached));
      }
    }
  }

createNote(note: Note) {
  if (this.network.online()) {
    this.http.post<Note>(`${this.apiUrl}/notes`, note).subscribe(newNote => {
      this.notes.update(list => [...list, newNote]);
      localStorage.setItem('notes', JSON.stringify(this.notes()));
    });
  } else {
    const pending = JSON.parse(localStorage.getItem('pendingNotes') || '[]');
    pending.push({ action: 'create', note });
    localStorage.setItem('pendingNotes', JSON.stringify(pending));

    this.notes.update(list => [...list, note]);
    localStorage.setItem('notes', JSON.stringify(this.notes())); 
  }
}


deleteNote(id: number) {
  if (this.network.online()) {
    this.http.delete(`${this.apiUrl}/notes/${id}`).subscribe(() => {
      this.notes.update(list => list.filter(n => n.id !== id));
      localStorage.setItem('notes', JSON.stringify(this.notes()));
    });
  } else {
    const pending = JSON.parse(localStorage.getItem('pendingNotes') || '[]');
    pending.push({ action: 'delete', id });
    localStorage.setItem('pendingNotes', JSON.stringify(pending));

    this.notes.update(list => list.filter(n => n.id !== id));
    localStorage.setItem('notes', JSON.stringify(this.notes()));
  }
}


async syncPending() {
  const pending: { action: 'create' | 'delete'; note?: Note; id?: number }[] =
    JSON.parse(localStorage.getItem('pendingNotes') || '[]');

  for (const op of pending) {
    if (op.action === 'create' && op.note) {
      await firstValueFrom(this.http.post<Note>(`${this.apiUrl}/notes`, op.note));
    } else if (op.action === 'delete' && op.id !== undefined) {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/notes/${op.id}`));
    }
  }
  if (pending.length > 0) {
    localStorage.removeItem('pendingNotes');
    this.loadNotes();
  }
}


}
