import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {
  listId: string

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.listId) {
        this.listId = params.listId
      } else {
        this.listId = undefined
      }
    })
  }

  updateList(value: string) {
    this.taskService.update(value, this.listId).subscribe(() => {
      this.router.navigate(['/lists', this.listId])
    })
  }

}
