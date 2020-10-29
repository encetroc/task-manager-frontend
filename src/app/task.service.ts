import { Injectable } from '@angular/core'
import { WebRequestService } from './web-request.service'
import { Task } from './models/task.model'

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

  createTask(title: string, listId: string) {
    return this.webReqSer.post(`lists/${listId}/tasks`, {title})
  }

  getTasks(listId: string) {
    return this.webReqSer.get(`lists/${listId}/tasks`)
  }

  complete(task: Task) {
    return this.webReqSer.patch(`tasks/${task._id}`, {completed: !task.completed})
  }
}
