import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../../backend/auth-service';
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

  private authenticationSub!: Subscription;
  isAuthenticated = false;

  constructor(private PostDataService: PostDataService, private router: Router, private authService: AuthService) { }
  
  ngOnDestroy(): void {
    this.PostEntriesSub.unsubscribe();
    this.authenticationSub.unsubscribe();
  }

  PostEntries: PostEntry[] = [];
  PostEntriesSub = new Subscription();

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

  onDelete(id: string){
    this.PostDataService.onDeleteEntry(id);
  }

  onEdit(id: string){
    this.router.navigate(['edit',id])
  }
}
