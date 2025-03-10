import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent,IonButton,IonItem,IonInput,IonLabel,IonText } from '@ionic/angular/standalone';
import { DatabaseService } from '../services/database.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonButton,IonItem,IonInput,IonText, IonLabel,CommonModule,ReactiveFormsModule, FormsModule],
})

export class HomePage implements OnInit {
  employeeForm: FormGroup; 
  isEditMode = false; 
  constructor(
    private fb: FormBuilder, 
    private database: DatabaseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form with validation rules
    this.employeeForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      department: ['', Validators.required],
      position: ['', Validators.required],
      contact: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)], 
      ],
    });
  }
  async ngOnInit() {
    await this.database.initializeDatabase(); 

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      const employee = await this.database.getEmployeeById(+id);
      if (employee) {
        this.employeeForm.patchValue(employee);
      }
    }
  }
  async saveEmployee() {
    if (this.employeeForm.invalid) {
      return;
    }

    const employee = this.employeeForm.value;
    if (this.isEditMode) {
      await this.database.updateEmployee(employee);
    } else {
      await this.database.addEmployee(employee);
    }
    this.router.navigate(['/employee-list']);
  }
}