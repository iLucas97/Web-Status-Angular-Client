import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerModel } from '../models/ServerModel';
import { SavedDataService } from '../services/SavedDataService';
import { ServerStatusModel } from '../models/ServerStatusModel';
import { RESTService } from '../services/RESTService';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css']
})
export class ServerListComponent implements OnInit {
  servers: ServerModel[] = [];
  addServerButtonText = 'Add Server';
  detailSelected: any;
  isLoading: boolean = false;
  constructor(private savedDataService: SavedDataService, private restService: RESTService) { }

  ngOnInit() {
    this.loadServers()
  }
loadServers() {
  this.servers = this.savedDataService.get();
    console.log("Result loadSavedServers():", this.servers);
  };
  detailedServer: ServerStatusModel;

    onCheckStatus(server: ServerModel) {
      console.log("onCheckStatus()")
      this.isLoading = true;
      this.restService.checkServer(server).then(result => {
        this.isLoading = false;
       this.detailedServer = result;
       console.log("Result onSelectDetail():", this.detailedServer);  
      
      })
    }
    onCloseDetails() {
      
      this.detailedServer = undefined;    
    }
    onClearData() {
    this.savedDataService.clearData() 
    this.loadServers();
   }
}
