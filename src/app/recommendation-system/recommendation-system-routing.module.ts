import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { link } from 'fs';
import { ChangePasswordComponent } from '../authentication/components/change-password/change-password.component';
import { EditProfileComponent } from '../authentication/components/edit-profile/edit-profile.component';
import { RegisterComponent } from '../authentication/components/register/register.component';
import { AuthGuardService } from '../authentication/services/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { RedirectToDocumentComponent } from './components/redirect-to-document/redirect-to-document.component';
import { AddDocumentLinkComponent } from './document/components/add-document-link/add-document-link.component';
import { AddDocumentComponent } from './document/components/add-document/add-document.component';
import { ViewDocumentComponent } from './document/components/view-document/view-document.component';
import { RecommendationSystemComponent } from './recommendation-system.component';
import { EditSubjectComponent } from './subject/components/edit-subject/edit-subject.component';
import { ViewSubjectsComponent } from './subject/components/view-subjects/view-subjects.component';
import { EditUserComponent } from './users/components/edit-user/edit-user.component';
import { ViewUsersComponent } from './users/components/view-users/view-users.component';


const routes: Routes = [{
  path: "",
  component: RecommendationSystemComponent,
  children: [
    {
      path: "",
      component: HomeComponent,
      canActivate: [AuthGuardService],
      data:{
        roles : 'Student'
      }
    },
    {
      path: 'change-password/:id',
      component: ChangePasswordComponent,
      canActivate: [AuthGuardService],
      data:{
        roles : 'Student'
      }
    },
    {
      path: 'subjects/add-subject',
      component: EditSubjectComponent,
      canActivate: [AuthGuardService],
      data:{
        roles : 'Student'
      }
    },
    {
      path: 'subjects/edit-subject/:id',
      component: EditSubjectComponent,
      canActivate: [AuthGuardService],
      data:{
        roles : 'Student'
      }
    },
    {
      path: 'subjects/view-subjects',
      component: ViewSubjectsComponent,
      canActivate: [AuthGuardService],
      data:{
        roles : 'Student'
      }
    },
    {
      path: 'users/register',
      component: RegisterComponent,
      data:{
        roles : 'Student'
      }
    },
    {
      path: 'edit-profile/:id',
      component: EditProfileComponent,
      data:{
        roles : 'Student'
      }
    },
    {
      path: 'documents/add-documents',
      component: AddDocumentComponent,
      canActivate: [AuthGuardService],
      data:{
        roles : 'Student'
      }
    },
    {
      path: 'documents/view-documents',
      component: ViewDocumentComponent,
      canActivate: [AuthGuardService],
      data:{
        roles : 'Student'
      }
    },
    {
      path: 'users/edit-user/:id',
      component: EditUserComponent,
      canActivate: [AuthGuardService],
      data:{
        roles : 'Student'
      }   
    },
    {
      path: 'users/view-users',
      component: ViewUsersComponent,
      canActivate: [AuthGuardService],
      data:{
        roles : 'Student'
      }
    },
    {
      path: 'documents/add-document-link',
      component: AddDocumentLinkComponent,
      canActivate: [AuthGuardService],
      data:{
        roles : 'Student'
      }
    },
    {
      path: 'documents/redirect-to-document',
      component: RedirectToDocumentComponent,
      canActivate: [AuthGuardService],
      data:{
        roles : 'Student'
      }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecommendationSystemRoutingModule { }
