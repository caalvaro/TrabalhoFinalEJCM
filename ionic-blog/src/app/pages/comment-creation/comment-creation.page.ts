import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-comment-creation',
  templateUrl: './comment-creation.page.html',
  styleUrls: ['./comment-creation.page.scss'],
})
export class CommentCreationPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }

}
