import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Site } from '../types/site';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  sites: any;

  private SiteDbPath = 'site';
  SiteDetailsRef: AngularFireList<Site>;

  constructor(
    private db: AngularFireDatabase,
  ) {
    this.SiteDetailsRef = db.list(this.SiteDbPath);
  }

  addSite(newSite: Site): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.SiteDetailsRef.push(newSite).then(ref => {
        const siteId = ref.key; 
        if (siteId) {
          this.SiteDetailsRef.update(siteId, { id: siteId }).then(() => {
            resolve();
          }).catch(error => {
            reject(error);
          });
        } else {
          reject("Failed to retrieve key for the new site.");
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

  updateSite(key: string, updatedSite: Site): Promise<void> {
    return this.SiteDetailsRef.update(key, updatedSite).then(() => {
      console.log('Site updated successfully!');
    }).catch(error => {
      console.error('Error updating site: ', error);
      throw error;
    });
  }

  deleteSite(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.SiteDetailsRef.snapshotChanges().pipe(
        take(1)
      ).subscribe(sites => {        
        const siteToDelete = sites.find(site => {
          if (site && site.payload.val() && site.payload.val()?.id === id) {
            return true;
          }
          return false;
        });
        if (siteToDelete) {
          const siteKey = siteToDelete.key;
          if (siteKey) { 
            this.SiteDetailsRef.remove(siteKey)
              .then(() => {
                console.log('Site deleted successfully!');
                resolve();
              })
              .catch(error => {
                console.error('Error deleting site: ', error);
                reject(error);
              });
          } else {
            console.error('Site key is null.');
            reject('Site key is null.');
          }
        } else {
          console.error('Site not found with id: ', id);
          reject('Site not found');
        }
      });
    });
  }

  getSiteByKey(key: string): Observable<Site | null> {
    return this.db.object<Site>(`${this.SiteDbPath}/${key}`).valueChanges();
  }

  getSites(): Observable<Site[]> {
    return this.SiteDetailsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Site }))
      )
    );
  }

}
