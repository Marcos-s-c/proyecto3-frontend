// posts.component.ts
import { Component, OnInit } from '@angular/core';
import { DialogPostService } from '../../../services/dialogPost.service';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MaskService } from 'src/app/services/mask.service';
import Swal from "sweetalert2";

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
    public maskService:MaskService
  ) {}

  posts: any[] = [];
  maxWordsToShow = 50;

  ngOnInit(): void {
    this.maskService.isLoading = true;
    this.cargarPosts();

  }

  cargarPosts():void{
    this.postService.getAllPosts().subscribe((response: any) => {

      this.posts = response;
      console.log(this.posts);
      this.maskService.isLoading = false;
    });
  }

  toggleLike(post: any): void {
    post.likedByLoggedUser = !post.likedByLoggedUser;
    this.postService.likePost(post.postId).subscribe((data=>{
      console.log(data);
    }))
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

  borrarPost(postId: number){
    Swal.fire({
      title: 'Borrar publicación',
      text: '¿Deseas borrar la publicación?',
      showDenyButton: true,
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario hizo clic en "Aceptar"
        this.postService.borrarPost(postId).subscribe((response:any) => {
          console.log('borrar')
          this.cargarPosts();
        })
      }
    });


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
