import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Site } from '../types/site';
import { Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteService {


  private SiteDbPath = 'site';
  SiteDetailsRef: AngularFireList<Site>;

  constructor(
    private db: AngularFireDatabase,
    public router: Router
  ) {
    this.SiteDetailsRef = db.list(this.SiteDbPath);
  }

  addSite(newSite: Site) {
    const sitesRef = this.db.list(this.SiteDbPath);
    sitesRef.valueChanges().pipe(take(1)).subscribe((data: any[]) => {
      const nextKey = (data.length + 1).toString();
      sitesRef.set(nextKey, newSite);
    });
  }

  updateSite(siteId: any, updatedSite: any) {
    const sitesRef = this.db.list(this.SiteDbPath);
    sitesRef.set(siteId, updatedSite);
  }

  getSites(): Observable<any[]> {
    return this.db.list(this.SiteDbPath).valueChanges();
  }

  getSiteByIndex(index: string): Observable<any> {
    const numericIndex = parseInt(index, 10);

    return this.SiteDetailsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as any }))
      ),
      map(sites =>
        sites[numericIndex]
      )
    );

  }
}
