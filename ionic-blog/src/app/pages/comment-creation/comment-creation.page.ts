import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentService } from '../../service/comment.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-comment-creation',
  templateUrl: './comment-creation.page.html',
  styleUrls: ['./comment-creation.page.scss'],
})
export class CommentCreationPage implements OnInit {

  @Input() id;
  registerForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private commentService: CommentService,
    public router: Router,
    public formBuilder: FormBuilder
    ) {
      this.registerForm = this.formBuilder.group({
        content: [null, [Validators.required, Validators.minLength(1)]],
        user_id: [null, [Validators.required, Validators.minLength(1)]],
        post_id: this.id
      });
     }

  ngOnInit() {
  }

  public postComment(form) {

    if (form.status === 'VALID') {
      this.commentService.postComments(form.value, this.id).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/login']);
        }
      )
    }
  }

  close() {
    this.modalController.dismiss();
  }

}
