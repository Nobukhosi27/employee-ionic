import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList,IonLabel,IonItem,IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.page.html',
  styleUrls: ['./employee-list.page.scss'],
  standalone: true,
  imports: [IonList, IonContent, IonHeader, IonTitle, IonToolbar,IonItem,IonLabel, CommonModule, FormsModule]
})
export class EmployeeListPage implements OnInit {

    employees: any[] = [];
    filteredEmployees: any[] = [];
    searchTerm: string = '';
  
    constructor(private database: DatabaseService) {}
  
    async ngOnInit() {
      await this.database.initializeDatabase();
      this.employees = await this.database.getEmployees();
      this.filteredEmployees = this.employees;
    }
  
    filterEmployees() {
      this.filteredEmployees = this.employees.filter((employee) => {
        return (
          employee.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          employee.department.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          employee.position.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
    }

  }

  