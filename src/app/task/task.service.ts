import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Task } from '../types/task';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: any

  private TaskDbPath = 'tasks';
  TaskDetailsRef: AngularFireList<Task>;

  constructor(
    private db: AngularFireDatabase,
  ) {
    this.TaskDetailsRef = db.list(this.TaskDbPath);
  }

  addTask(task: Task): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.TaskDetailsRef.push(task).then(ref => {
        const taskId = ref.key; // Вземете уникалния ключ
        if (taskId) {
          // Актуализирайте таската с уникалния ключ като id
          this.TaskDetailsRef.update(taskId, { id: taskId }).then(() => {
            resolve();
          }).catch(error => {
            reject(error);
          });
        } else {
          reject("Failed to retrieve key for the new task.");
        }
      }).catch(error => {
        reject(error);
      });
    });
  }
  

  getTaskByKey(key: string): Observable<Task | null> {
    return this.db.object<Task>(`${this.TaskDbPath}/${key}`).valueChanges();
  }

  updateTask(key: string, updatedTask: Task): Promise<void> {
    return this.TaskDetailsRef.update(key, updatedTask).then(() => {
      console.log('Task updated successfully!');
    }).catch(error => {
      console.error('Error updating task: ', error);
      throw error;
    });
  }

  deleteTask(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.TaskDetailsRef.snapshotChanges().pipe(
        take(1)
      ).subscribe(tasks => {
        
        const taskToDelete = tasks.find(task => {
          if (task && task.payload.val() && task.payload.val()?.id === id) {
            return true;
          }
          return false;
        });
        if (taskToDelete) {
          const taskKey = taskToDelete.key;
          if (taskKey) { // Проверка дали taskKey не е null
            this.TaskDetailsRef.remove(taskKey)
              .then(() => {
                console.log('Task deleted successfully!');
                resolve();
              })
              .catch(error => {
                console.error('Error deleting task: ', error);
                reject(error);
              });
          } else {
            console.error('Task key is null.');
            reject('Task key is null.');
          }
        } else {
          console.error('Task not found with id: ', id);
          reject('Task not found');
        }
      });
    });
  }
  
  
  getTasks(): Observable<Task[]> {
    return this.TaskDetailsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Task }))
      )
    );
  }

  getTaskByIndex(index: number): Observable<Task | null> {
    return this.TaskDetailsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Task }))
      ),
      map(tasks =>
        tasks[index]
      )
    );
  }
}
