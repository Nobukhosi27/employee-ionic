// src/app/services/database.service.ts
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { MockDatabaseService } from './mock-database.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private db: SQLiteObject | null = null;

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private mockDatabase: MockDatabaseService
  ) {}

  async initializeDatabase() {
    if (this.platform.is('cordova')) {
      // Use the real SQLite plugin on a device
      try {
        this.db = await this.sqlite.create({
          name: 'employee_db.db',
          location: 'default',
        });
        await this.createTable();
        console.log('Database initialized successfully');
      } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
      }
    } else {
      // Use the mock service in the browser
      await this.mockDatabase.initializeDatabase();
    }
  }

  private async createTable() {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    const query = `
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        department TEXT NOT NULL,
        position TEXT NOT NULL,
        contact TEXT NOT NULL
      );
    `;
    await this.db.executeSql(query, []);
  }

  // CRUD Operations
  async getEmployees(): Promise<any[]> {
    if (this.platform.is('cordova')) {
      if (!this.db) {
        throw new Error('Database not initialized');
      }
      const result = await this.db.executeSql('SELECT * FROM employees', []);
      return result.rows.item(0);
    } else {
      return this.mockDatabase.getEmployees();
    }
  }

  async getEmployeeById(id: number): Promise<any> {
    if (this.platform.is('cordova')) {
      if (!this.db) {
        throw new Error('Database not initialized');
      }
      const result = await this.db.executeSql(
        'SELECT * FROM employees WHERE id = ?',
        [id]
      );
      if (result.rows.length > 0) {
        return result.rows.item(0);
      }
      return null;
    } else {
      return this.mockDatabase.getEmployeeById(id);
    }
  }

  async addEmployee(employee: any): Promise<void> {
    if (this.platform.is('cordova')) {
      if (!this.db) {
        throw new Error('Database not initialized');
      }
      const query = `
        INSERT INTO employees (name, department, position, contact)
        VALUES (?, ?, ?, ?);
      `;
      await this.db.executeSql(query, [
        employee.name,
        employee.department,
        employee.position,
        employee.contact,
      ]);
    } else {
      await this.mockDatabase.addEmployee(employee);
    }
  }

  async updateEmployee(employee: any): Promise<void> {
    if (this.platform.is('cordova')) {
      if (!this.db) {
        throw new Error('Database not initialized');
      }
      const query = `
        UPDATE employees
        SET name = ?, department = ?, position = ?, contact = ?
        WHERE id = ?;
      `;
      await this.db.executeSql(query, [
        employee.name,
        employee.department,
        employee.position,
        employee.contact,
        employee.id,
      ]);
    } else {
      await this.mockDatabase.updateEmployee(employee);
    }
  }

  async deleteEmployee(id: number): Promise<void> {
    if (this.platform.is('cordova')) {
      if (!this.db) {
        throw new Error('Database not initialized');
      }
      const query = 'DELETE FROM employees WHERE id = ?';
      await this.db.executeSql(query, [id]);
    } else {
      await this.mockDatabase.deleteEmployee(id);
    }
  }
}