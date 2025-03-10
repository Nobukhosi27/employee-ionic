import { Injectable } from '@angular/core';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class MockDatabaseService {
  private db: any = {
    executeSql: (query: string, params: any[]) => {
      console.log('Mock executeSql:', query, params);
      return Promise.resolve({ rows: { item: (index: number) => ({}) } });
    },
  };

  async initializeDatabase() {
    console.log('Mock database initialized');
  }

  async getEmployees(): Promise<any[]> {
    return Promise.resolve([]);
  }

  async getEmployeeById(id: number): Promise<any> {
    return Promise.resolve(null);
  }

  async addEmployee(employee: any): Promise<void> {
    console.log('Mock addEmployee:', employee);
  }

  async updateEmployee(employee: any): Promise<void> {
    console.log('Mock updateEmployee:', employee);
  }

  async deleteEmployee(id: number): Promise<void> {
    console.log('Mock deleteEmployee:', id);
  }
}



