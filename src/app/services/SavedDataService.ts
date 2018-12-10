import { Injectable, Inject } from "@angular/core";
import { ServerModel } from "../models/ServerModel";
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
@Injectable()
export class SavedDataService {

    private storageKey: string = 'servers_saved';
    constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) { }
    private servers: ServerModel[] = [];
    private dummyServers : ServerModel[] = [{
        id: 0,
        domain: "www.ilucas.it",
        name: "iLucas",
        port: "80",
        protocol: "http"
    
      }];
    private save() {
        this.storage.set(this.storageKey, this.servers);
    };

    public clearData() {
        this.storage.remove(this.storageKey);
    }
   public get() { 
       let localData = this.storage.get(this.storageKey);;
        this.servers = (localData == null || localData == undefined) ? [] : localData; 
        return this.servers;
    }
    public add(addingServer: ServerModel) {

        this.servers.push(addingServer);
        this.save();
    }
    public remove(idx) {
        this.servers.splice(idx, 1)
        this.save();
    }

}