import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  addTask(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);   
  }
}
