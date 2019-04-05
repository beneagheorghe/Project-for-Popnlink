import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
 
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

declare var M: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.resetForm();
    this.refresUserList();
  }

  resetForm(form?: NgForm) {
    if(form)
    form.reset();
    this.userService.selectedUser = {
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: null
    }
    
  }

  onSubmit(form: NgForm) {
    if(form.value._id == "") {
     this.userService.postUser(form.value).subscribe((res) => {
       this.resetForm(form);
       this.refresUserList();
       M.toast({ html: 'Saved successufully' , classes: 'rounded'});
     });
    } else {
      this.userService.putUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refresUserList();
        M.toast({ html: 'Updated successufully' , classes: 'rounded'});
      });
    }
  }

  refresUserList() {
    this.userService.getUserList().subscribe((res) => {
      this.userService.users = res as User[];
    });
  }

  onEdit(user: User) {
    this.userService.selectedUser = user;
  }

  onDelete(_id : string , form: NgForm) {
    if (confirm("Are you sure to delete this record ?") == true) {
      this.userService.deleteUser(_id).subscribe((res) => {
        this.refresUserList();
        this.resetForm(form);
        M.toast({ html: 'Delete successefully' , classes: 'rounded'});
      });
    }
  }

}
