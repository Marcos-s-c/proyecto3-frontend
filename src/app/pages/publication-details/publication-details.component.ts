import { Component, OnInit, SimpleChanges } from '@angular/core';
import { TextAreaComponent } from 'src/app/components/text-area/text-area.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { InputComponent } from 'src/app/components/input/input.component';
import { ActivatedRoute } from '@angular/router';
import { UploadButtonComponent } from 'src/app/components/upload-button/upload-button.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-publication-details',
  templateUrl: './publication-details.component.html',
  styleUrls: ['./publication-details.component.scss'],
  imports: [TextAreaComponent,ButtonComponent,InputComponent,UploadButtonComponent],
  standalone: true,
})
export class PublicationDetailsComponent implements OnInit {

  private postId: string;
  public imageUrl: string;
  public previewUrl: any;
  public subject: string = '';
  public content: string;
  private file: any;

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.postId = params['postId'];
      });

      if(this.postId){
        //apiCall to populate
        return;
      }
      this.imageUrl = '../../assets/noImage.jpg';
  }

  submit = () =>{
    const formData = new FormData();
    formData.append('file', this.file);              
    formData.append('subject', 'text');
    formData.append('content','text')
  }

  public onFileUpload = (file:Blob) =>{
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.previewUrl = fileReader.result as string;
      this.cdr.detectChanges();
    };
    fileReader.readAsDataURL(file);
    this.file = file;
  }
}
