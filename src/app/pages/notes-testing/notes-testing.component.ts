import { Component, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-notes-testing',
  templateUrl: './notes-testing.component.html',
  styleUrls: ['./notes-testing.component.css']
})
export class NotesTestingComponent {
  @ViewChild('notesBox') notes!: ElementRef;


  yearInput: number = 0;

  notesYear(yearInput: number): void {
    this.yearInput = yearInput;
    console.log(this.yearInput);

    this.notes.nativeElement.innerHTML = this.notesArray[this.yearInput];
  }

  notesArray = [
    ["Test for year 23"],
    ["Test for year 22"],
    ["Test for year 21"],
    ["Test for year 20"],
    ["Test for year 19"],
    ["Test for year 18"]
  ]

}
