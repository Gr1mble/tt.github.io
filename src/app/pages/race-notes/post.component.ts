import { Component, OnInit, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import { AuthService } from '../../../../backend/auth-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostEntry } from 'backend/postEntry.model';
import { PostDataService } from 'backend/postData.component';

@Component({
  selector: 'app-race-notes',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit, OnDestroy {
  @ViewChild('notesBox') notes!: ElementRef;
  @ViewChild('notesHeader') header!: ElementRef;

  editMode = false;
  private paramId!: string;

  postEntry!: PostEntry;

  postForm!: FormGroup;

  private authenticationSub!: Subscription;
  isAuthenticated = false;
  isSelected = false;

  constructor(
    private PostDataService: PostDataService, 
    private router: Router, 
    private authService: AuthService,
    ) {}
  
  ngOnDestroy(): void {
    this.PostEntriesSub.unsubscribe();
    this.authenticationSub.unsubscribe();
  }

  PostEntries: PostEntry[] = [];
  PostEntriesSub = new Subscription();
  currentPostId = "";

  ngOnInit(): void {
    this.postForm = new FormGroup({
      'year': new FormControl(this.editMode ? this.postEntry.year : '', [Validators.required]),
      'entry': new FormControl(this.editMode ? this.postEntry.entry : '', [Validators.required])
    })
    
    this.PostDataService.getPostEntries();
    this.PostEntriesSub = this.PostDataService.PostSubject.subscribe(entries => {
      this.PostEntries = entries;
    })
    this.authenticationSub = this.authService.getAuthenticatedSub().subscribe(status => {
      this.isAuthenticated = status;
    })
    this.isAuthenticated = this.authService.getIsAuthenticated();
}

  onDelete(){
    this.PostDataService.onDeleteEntry(this.currentPostId);
  }

  onEdit(){
    this.postEntry = this.PostDataService.getPostEntry(this.currentPostId);
    this.editMode = true;

    this.postForm.setValue({
      year: this.PostDataService.getPostEntry(this.currentPostId).year, 
      entry: this.PostDataService.getPostEntry(this.currentPostId).entry
    });
  }

  getEntryPost(id: string){
    this.currentPostId = id;
    this.notes.nativeElement.innerHTML = this.PostDataService.getPostEntry(id).entry;
    this.header.nativeElement.innerHTML = this.PostDataService.getPostEntry(id).year;

    if(this.currentPostId != ''){
      this.isSelected = true;
  } else {
      this.isSelected = false;
  }
  }

    onSubmit() {
    const entry = new PostEntry('', this.postForm.value.year, this.postForm.value.entry);
  
    if (this.editMode) {
      entry.id = this.currentPostId;

      try {
        // Update the entry and wait for it to complete
        this.PostDataService.updateEntry(this.currentPostId, entry);

      } catch (error) {
        console.error('Error updating entry:', error);
      }
    } else {
      this.PostDataService.onAddPostEntry(entry);
    }
   
  }
  
  
}
