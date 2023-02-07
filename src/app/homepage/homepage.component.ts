import { Component, OnInit } from '@angular/core';
import { Note } from '../noteapp';
import { NoteAppService } from '../noteapp.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  noteDialogVisibility = false;
  notes: Note[] = [];
  addNote: Note = {
    title: '',
    body: ''
  };
  search!: string;
  constructor(private noteAppService: NoteAppService) {}

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes() {
    this.noteAppService.getAll(this.search).subscribe((response: any) => {
      this.notes = response;
    });
  }

  openDialog() {
    this.addNote={title: '',
    body: ''};
    this.noteDialogVisibility = true;
  }
  closeDialog() {
    this.noteDialogVisibility = false;
  }
  saveOnClick() {
    if(this.addNote.id == undefined) {
      this.noteAppService.add(this.addNote).subscribe(() => this.getNotes());
    }else{
      this.noteAppService.update(this.addNote).subscribe(() => this.getNotes());
    }
    
    this.noteDialogVisibility = false;
  }
  removeOnClick(event:any, id?:number){
    this.noteAppService.delete(id!).subscribe(()=> this.getNotes());
    this.noteDialogVisibility = false;

    event.stopPropagation();
  }
  editOnClick(note:Note){
    this.noteDialogVisibility = true;
    this.addNote = { ...note };
  }

  change() {
    this.getNotes();
  }
}
