import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private usernameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public username$: Observable<string | null> = this.usernameSubject.asObservable();

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
    this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          JSON.parse(localStorage.getItem('user')!);
          return this.db.object(`users/${user.uid}`).valueChanges().pipe(
            first(),
            map((userData: any) => userData?.username || null)
          );
        } else {
          return of(null);
        }
      })
    ).subscribe(username => {
      this.usernameSubject.next(username); 
      localStorage.setItem('username', username || '');
    });
  }

  //Get username
  getUsername(): Observable<string | null> {
    return this.username$;
  }

  // Sign in with email/password
  login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.db.object(`users/${user.uid}`).valueChanges().subscribe((userData: any) => {
              localStorage.setItem('username', userData?.username);
            });
            this.router.navigate(['home']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Register with email/password
  register(email: string, password: string, username: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user,
          userRef = this.db.object(`users/${user?.uid}`);
        userRef.set({ email: email, username: username });
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['home']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return !!user;
  }

  // Sign out
  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.setItem('username', 'null');
      localStorage.setItem('user', 'null');
      localStorage.removeItem('username');
      this.router.navigate(['login']);
    });
  }

  ngOnDestroy(): void {
    this.afAuth.signOut();
  }
}