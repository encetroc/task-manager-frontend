import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqSer: WebRequestService) { }

  createList(title: string) {
    return this.webReqSer.post('lists', {title})
  }

  getLists() {
    return this.webReqSer.get('lists')
  }

  getTasks(listId: string) {
    return this.webReqSer.get(`lists/${listId}/tasks`)
  }
}
