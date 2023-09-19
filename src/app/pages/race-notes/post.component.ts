import { Component, OnInit, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import { AuthService } from '../../../../backend/auth-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostEntry } from 'backend/postEntry.model';
import { PostDataService } from 'backend/postData.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-race-notes',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit, OnDestroy {
  @ViewChild('notesBox') notes!: ElementRef;
  @ViewChild('notesHeader') header!: ElementRef;
  @ViewChild('editModal') edit!: ElementRef;

  showModal = false;
  modalTitle = '';
  modalContent = '';

  private authenticationSub!: Subscription;
  isAuthenticated = false;

  constructor(private PostDataService: PostDataService, private router: Router, private authService: AuthService,private dialogRef : MatDialog) {}
  
  ngOnDestroy(): void {
    this.PostEntriesSub.unsubscribe();
    this.authenticationSub.unsubscribe();
  }

  PostEntries: PostEntry[] = [];
  PostEntriesSub = new Subscription();
  currentPostId = "";
  display = 'none';

  ngOnInit(): void {
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
    this.router.navigate(['edit',this.currentPostId])
  }

  onNewPost(){
    this.router.navigate(['data-entry'])
  }

  getEntryPost(id: string){
    this.notes.nativeElement.innerHTML = this.PostDataService.getPostEntry(id).entry;
    this.header.nativeElement.innerHTML = this.PostDataService.getPostEntry(id).year;
    this.currentPostId = id;
  }

  openDialog(){
    this.dialogRef.open(PostComponent,{
      data : {
        name : 'Samuel'
      }
    });
  }
}
