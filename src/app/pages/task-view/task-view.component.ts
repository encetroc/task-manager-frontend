import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router'
import { TaskService } from 'src/app/task.service'
import { List } from '../../models/list.model'
import { Task } from '../../models/task.model'

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  lists: List[]
  tasks: Task[]
  selectedListId: string

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.listId) {
        this.selectedListId = params.listId
        this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => this.tasks = tasks)
      } else {
        this.tasks = undefined
      }
    })

    this.taskService.getLists().subscribe((lists: List[]) => this.lists = lists)
  }

  onTaskClick(task: Task) {
    this.taskService.complete(task).subscribe(() => {
      task.completed = !task.completed
    })
  }

  deleteList() {
    this.taskService.deleteList(this.selectedListId).subscribe(() => {
      this.router.navigate(['/lists'])
    })
  }

  taskDelete(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(task => task._id !== taskId)
    })
  }
}
