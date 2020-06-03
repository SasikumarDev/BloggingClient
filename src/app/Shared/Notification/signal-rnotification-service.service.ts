import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRNotificationServiceService {
  messageReceived = new EventEmitter<any>();
  connectionEstablished = new EventEmitter<boolean>();

  private connectionIsEstablished = false;
  // tslint:disable-next-line:variable-name
  private _hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  // sendMessage(message: Message) {
  //   this._hubConnection.invoke('NewMessage', message);
  // }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001' + '/Notification', {
        accessTokenFactory: () => window.localStorage.getItem('BlogGTKn')
      })
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
        this.registerOnServerEvents();
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(function () { this.startConnection(); }, 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('MessageReceived', (data: any) => {
      // this.messageReceived.emit(data);
      console.log(data);
    });
  }
}
