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

  update(title: string, listId: string) {
    return this.webReqSer.patch(`lists/${listId}`, {title})
  }

  updateTask(title: string, taskId: string) {
    return this.webReqSer.patch(`tasks/${taskId}`, {title})
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

  deleteTask(taskId) {
    return this.webReqSer.delete(`tasks/${taskId}`)
  }

  complete(task: Task) {
    return this.webReqSer.patch(`tasks/${task._id}`, {completed: !task.completed})
  }

  deleteList(listId: string) {
    return this.webReqSer.delete(`lists/${listId}`)
  }
}
