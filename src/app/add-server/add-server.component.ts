import { Component, OnInit } from '@angular/core';
import { ServerModel } from '../models/ServerModel';
import { SavedDataService } from '../services/SavedDataService';
import {Router} from '@angular/router';
import { RESTService } from '../services/RESTService';

@Component({
  selector: 'app-add-server',
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.css']
})
export class AddServerComponent implements OnInit {
  addingModes: string[] = ["MANUAL", "TEXT"];
  protocols: string[] = ["http", "https", "ftp"];
  isLoading: boolean = false;
  addingMode: string;
  newServer: ServerModel;
  textWithUrl: string;
  constructor(private savedDataService: SavedDataService, private router: Router, private restService: RESTService) { }

  ngOnInit() {
    this.newServer = new ServerModel();
    this.addingMode = "TEXT";
    this.textWithUrl = '';
  }
  showAlert(text: string) {
    console.log("Errore ", text);
  }
  init() {
    this.newServer = new ServerModel();
    this.addingMode = "TEXT";
    this.textWithUrl = '';
  }
  onAddServer() {
    switch (this.addingMode) {
      case 'MANUAL':
            this.onAddManualServer()
        break;
      case 'TEXT':
            this.onAddTextServer();
         break;
    }
  }
  onAddTextServer() {
    if (this.textWithUrl == '') {
      this.showAlert("Insert the text");
      return;
    }
    this.isLoading = true;
    console.log("Form text: ", this.textWithUrl)
    this.restService.addFromText(this.textWithUrl).then(response => {
      console.log("Response  addingFromText() ", response)
      this.isLoading = false;

      response.forEach(serverResponse => {
        this.savedDataService.add(serverResponse.server);
      })
      this.router.navigateByUrl('/')
      this.showAlert(response.length + " Servers added successfully")
    });
  }

  onAddManualServer(){
    if(this.newServer.domain == '' || this.newServer.domain == undefined) {
      this.showAlert("Dominio obbligatorio")
      return;
    }
    if(this.newServer.port == '' || this.newServer.port == undefined) {
      this.showAlert("Porta obbligatoria")
      return;
    }
    if(this.newServer.name == '' || this.newServer.name == undefined) {
      this.showAlert("Nome obbligatorio")
      return;
    }
    if(this.newServer.protocol == '' || this.newServer.protocol == undefined) {
      this.showAlert("Protocollo obbligatorio")
      return;
    }
    this.savedDataService.add(this.newServer);
    this.router.navigateByUrl('/')
  }
}
