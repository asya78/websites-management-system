import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, map, take } from 'rxjs';
import { Task } from '../types/task';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private TaskDbPath = 'tasks';
  TaskDetailsRef: AngularFireList<Task>;

  constructor(
    private db: AngularFireDatabase,
    public router: Router
  ) {
    this.TaskDetailsRef = db.list(this.TaskDbPath);
  }

  addTask(newTask: any) {
    const sitesRef = this.db.list(this.TaskDbPath);
    sitesRef.valueChanges().pipe(take(1)).subscribe((data: any[]) => {      
      const nextKey = (data.length + 1).toString();      
      sitesRef.set(nextKey, newTask);
    });
  }

  updateTask(taskId: any, updatedTask: any) {
    const sitesRef = this.db.list(this.TaskDbPath);
    sitesRef.set(taskId, updatedTask);
  }

  getTasks(): Observable<any[]> {
    return this.db.list(this.TaskDbPath).valueChanges();
  }

  getTaskId(): Observable<any[]> {
    return this.db.list(this.TaskDbPath).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as any }))
      )
    );
  }

  getTaskByIndex(index: string): Observable<any> {
    const numericIndex = parseInt(index, 10);

    return this.TaskDetailsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as any }))
      ),
      map(tasks =>
        tasks[numericIndex]
      )
    );
  }
}
