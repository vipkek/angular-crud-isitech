import { Component } from '@angular/core';
import { UserModel } from '../core/interface/models';
import { generateRandID } from '../core/utils/generic';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isUserModalOpen = false;
  selectedUser: UserModel | null = null;

  users: UserModel[] = [
    {
      id: generateRandID(),
      username: 'Boris123',
      firstName: 'Boris',
      lastName: 'Britva',
      email: 'borya3@asdas.com',
      userType: 'Admin',
      password: '123123123a'
    },
    {
      id: generateRandID(),
      username: 'username',
      firstName: 'test firstname',
      lastName: 'test lastname',
      email: 'test@asdas.com',
      userType: 'Driver',
      password: '123123123a'
    }
  ];

  constructor() {}

  addUser(user: UserModel): void {
    this.users.push(user);
  }

  deleteUser(username: string): void {
    this.users = this.users.filter((u: UserModel) => u.username !== username);
  }

  editUser(user: UserModel): void {
    const userIndex = this.users.findIndex(u => u.id === user.id);

    if (userIndex !== -1) {
      this.users[userIndex] = user;
    }
  }

  onSelectUser(user: UserModel) {
    if (this.isUserModalOpen) {
      this.isUserModalOpen = false;
    }
    this.selectedUser = user;
    this.isUserModalOpen = true;
  }

  onCloseModal() {
    this.isUserModalOpen = false;
    this.selectedUser = null;
  }
}
