// import { Injectable } from '@angular/core';
// import { StompService } from '@stomp/ng2-stompjs';
// import { StompConfig } from '@stomp/ng2-stompjs';
// import { Observable } from 'rxjs';
// // import * as SockJS from '@sockjs-client';
// import { Stomp } from '@stomp/stompjs';




// @Injectable({
//   providedIn: 'root'
// })
// export class WebSocketService {

//   private stompClient: StompService;

//   constructor() {
//     this.stompClient = new StompService(this.getStompConfig());
//   }

//   public connect(): void {
//     if (this.stompClient.connected()) {
//       console.log('Already connected');
//       return;
//     }
  
//   }

  

//   private getStompConfig(): StompConfig {
//     return {
//       url: 'http://localhost:7001/ws',
//       headers: {},
//       heartbeat_in: 0,
//       heartbeat_out: 20000,
//       reconnect_delay: 5000,
//       debug: true
//     };
//   }

//   public subscribeToTaskNotifications(username: string): Observable<any> {
//     return this.stompClient.subscribe(`/topic/tasks/${username}`);
//   }

//   // public subscribeToCompletionNotifications(username: string): Observable<any> {
//   //   return this.stompClient.subscribe(`/topic/completions/${username}`);
//   // }
// }
