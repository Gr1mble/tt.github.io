import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PostEntry } from 'backend/postEntry.model';
import { PostDataService } from 'backend/postData.component';

@Component({
  selector: 'app-race-notes-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit  {

  editMode = false;
  private paramId!: string;

  postEntry!: PostEntry;

  postForm!: FormGroup;
  
  
  constructor(private postDataService: PostDataService, private router: Router, private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')){
        this.editMode = true;
        this.paramId = paramMap.get('id')!;
        this.postEntry = this.postDataService.getPostEntry(this.paramId);
      }
      else{
        this.editMode = false;
      }
    })
    this.postForm = new FormGroup({
      'year': new FormControl(this.editMode ? this.postEntry.year : '', [Validators.required]),
      'entry': new FormControl(this.editMode ? this.postEntry.entry : '', [Validators.required])
    })
    
  }

  onSubmit(){
    const entry = new PostEntry('', this.postForm.value.year, this.postForm.value.entry);
    if(this.editMode){
      entry.id = this.paramId;
      this.postDataService.updateEntry(this.paramId, entry);
    }
    else{
      this.postDataService.onAddPostEntry(entry);
    }
    this.router.navigateByUrl("/racenotes");
  }
}