import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.css']
})
export class AddSiteComponent {

  addSite(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);   

  }

}
