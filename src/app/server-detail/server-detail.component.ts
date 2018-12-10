import { Component, OnInit, Input } from '@angular/core';
import { ServerStatusModel } from '../models/ServerStatusModel';

@Component({
  selector: 'app-server-detail',
  templateUrl: './server-detail.component.html',
  styleUrls: ['./server-detail.component.css']
})
export class ServerDetailComponent implements OnInit {
 
  @Input() detailedServer: ServerStatusModel;
  constructor() { }

  ngOnInit() {
    console.log("Detailed: ", this.detailedServer)
  }

}
