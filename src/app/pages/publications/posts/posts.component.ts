// posts.component.ts
import { Component, OnInit } from '@angular/core';
import { DialogPostService } from '../../../services/dialogPost.service';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NumberInput } from '@angular/cdk/coercion';
import { DataService } from '../../../services/dataService.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(
    private postService: PostService,
    private dialogPostService: DialogPostService,
    private router: Router,
    public login: LoginService,
    public dataService: DataService,
    private _snackBar: MatSnackBar,
  ) {}

  posts: any[] = [];
  maxWordsToShow = 50;
  addComment : Boolean = false;
  opened !: Number;
  newComment !: String;
  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((response: any) => {
      this.posts = response;
      console.log(this.posts);
    });
  }

  toggleLike(post: any): void {
    post.liked = !post.liked;
    post.active = true;
  }

  openComments(idComment : any){
    this.opened = idComment;
    this.addComment = true;
  }

  closeComments(){
    this.newComment = "";
    this.opened = 0;
    this.addComment = false;
  }

  sendComment(postId : any){
    let commentObj = {
      post_id : postId,
      date : new Date(),
      comment : this.newComment
    }
    this.dataService.addComment(commentObj).subscribe((response: any) => {
      if(response.id){
        this._snackBar.open("Su comentario fue envidado con exito.", undefined, { duration: 5 * 1000 });
        this.closeComments()
      }else{
        this._snackBar.open(
          'Ocurrió un problema al crear su comentario.', undefined, { duration: 5 * 1000 });
        this.closeComments()
      }
    });
  }

  openPost(post: any): void {
    this.dialogPostService.openPostDialog(post);
    console.log('Abriendo la publicación:', post);
  }

  calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  }

  newPostRoute() {
    this.router.navigate(['/community/publication-details']);
  }

  editPostRoute(param: number) {
    this.router.navigate([`/community/publication-details/${param}`]);
  }

  // Propiedad computada para el contenido truncado.
  getTruncatedContent(post: any): string {
    if (post && post.content) {
      const words = post.content.split(' ');
      const truncatedWords = words.slice(0, this.maxWordsToShow).join(' ');
      return words.length > this.maxWordsToShow
        ? truncatedWords + '...'
        : truncatedWords;
    }
    return '';
  }
}
