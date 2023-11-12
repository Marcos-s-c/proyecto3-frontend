import { Component, OnInit } from '@angular/core';
import { DialogPostService } from '../../../services/dialogPost.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(
    private postService: PostService,
    private dialogPostService: DialogPostService
  ) {}

  posts: any[] = [];

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((response: any) => {
      this.posts = response;
      console.log(this.posts);
    });
  }

  toggleLike(post: any): void {
    // Supongamos que tienes un servicio para manejar el cambio de like en el backend
    // En este ejemplo, solo cambiaremos la propiedad localmente
    post.liked = !post.liked;
    post.active = true;
  }

  openPost(post: any): void {
    this.dialogPostService.openPostDialog(post);
    // Puedes implementar la lógica para abrir la publicación aquí
    // Puede ser una redirección a una nueva página, un modal, etc.
    console.log('Abriendo la publicación:', post);
  }

  calculateReadingTime(content: string): number {
    // Esta función es un ejemplo simple para calcular el tiempo de lectura en minutos
    // Puedes mejorar la lógica según tus necesidades específicas
    const wordsPerMinute = 200; // Ajusta este valor según tu contenido
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  }
}
