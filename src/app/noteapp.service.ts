import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Note } from './noteapp';
import { NotExpr } from '@angular/compiler';
@Injectable({
  providedIn: 'root',
})
export class NoteAppService {
  notes: Note[] = [];

  constructor(private httpClient: HttpClient) {}

  add(note: Note) {
    return this.httpClient.post('http://localhost:3000/notes', note);
  }
  getAll(search:string){
    if(search){
      return this.httpClient.get<Note>('http://localhost:3000/notes?title_like&body_like=' + search)
    }else{
       return this.httpClient.get<Note>('http://localhost:3000/notes')
    }
   
  }

  delete(id:number){
    return this.httpClient.delete('http://localhost:3000/notes/' + id)
  }

  update (note:Note){
    return this.httpClient.put('http://localhost:3000/notes/' + note.id, note)
  }
}
