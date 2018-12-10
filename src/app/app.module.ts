import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ServerDetailComponent } from './server-detail/server-detail.component';
import { ServerListComponent } from './server-list/server-list.component';
import { AddServerComponent } from './add-server/add-server.component';
import { RESTService } from './services/RESTService';
import { SavedDataService } from './services/SavedDataService';
import { StorageServiceModule } from 'angular-webstorage-service';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms'; 
import { Http, HttpModule } from '@angular/http';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddServerComponent} 
  
];
@NgModule({
  declarations: [
    AppComponent,
    ServerDetailComponent,
    ServerListComponent,
    AddServerComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    StorageServiceModule,
    FormsModule,
    RouterModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers:[RESTService, SavedDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
