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
    const token = window.localStorage.getItem('BlogGTKn');
    if (token !== null) {
      this.createConnection();
      this.registerOnServerEvents();
      this.startConnection();
    }
  }

  // sendMessage(message: Message) {
  //   this._hubConnection.invoke('NewMessage', message);
  // }

  public createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001' + '/Notification', {
        accessTokenFactory: () => window.localStorage.getItem('BlogGTKn')
      })
      .build();
  }

  public startConnection(): void {
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
        setTimeout(function() { this.startConnection(); }, 5000);
      });
  }

  public registerOnServerEvents(): void {
    this._hubConnection.on('MessageReceived', (data: any) => {
      console.log('Data received........');
      this.messageReceived.emit(data);
    });
  }

  public StopConnection(): void {
    this._hubConnection.stop().then(() => {
      this.connectionIsEstablished = false;
      console.log('Hub connection Stoped');
      this.connectionEstablished.emit(false);
    })
    .catch(err => {
      console.log('Error while establishing disconnection, retrying...');
    });
  }
}
