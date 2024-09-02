import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ViewAuthorComponent } from './view-author/view-author.component';

export const routes: Routes = [
    {path:'home', component: HomeComponent},
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'', component: HomeComponent},
    {path: 'addBook', component: AddBookComponent},
    {path: 'editBook/:isbn', component: EditBookComponent},
    {path: 'viewBook/:isbn', component: ViewBookComponent},
    {path: 'dashboard', component: AdminDashboardComponent},
    {path: 'author/:id', component: ViewAuthorComponent}
];
