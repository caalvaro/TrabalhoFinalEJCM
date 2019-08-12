import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Camera } from '@ionic-native/camera/ngx';

import { PostingPage } from './posting.page';

const routes: Routes = [
  {
    path: '',
    component: PostingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [PostingPage],
  providers: [Camera]
})
export class PostingPageModule {}
