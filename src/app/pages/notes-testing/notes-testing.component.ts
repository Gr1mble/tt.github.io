import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-notes-testing',
  templateUrl: './notes-testing.component.html',
  styleUrls: ['./notes-testing.component.css']
})
export class NotesTestingComponent {

  title = 'angular-material';

  constructor(private dialogRef : MatDialog){}

  openDialog(){
    this.dialogRef.open(NotesTestingComponent,{
      data : {
        name : 'Samuel'
      }
    });
  }

}