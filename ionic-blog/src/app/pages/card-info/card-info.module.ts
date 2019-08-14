import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CardInfoPage } from './card-info.page';
import { CommentsCardComponent } from '../../components/comments-card/comments-card.component';

const routes: Routes = [
  {
    path: '',
    component: CardInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CardInfoPage, CommentsCardComponent]
})
export class CardInfoPageModule {}
