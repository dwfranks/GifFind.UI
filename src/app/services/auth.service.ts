import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { TokenPackage } from '../models/tokenPackage.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private currentUserSubject: BehaviorSubject<TokenPackage>;
    public currentUser: Observable<TokenPackage>;

    constructor(private readonly http: HttpClient,
                private readonly router: Router) {

        this.currentUserSubject = new BehaviorSubject<TokenPackage>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): TokenPackage {
        return this.currentUserSubject.value;
    }

    isTokenExpired(): boolean {
        if (!this.currentUserValue) {
            return true;
        }

        const expireDate = new Date(this.currentUserValue.expiration);

        return !(expireDate.valueOf() > new Date().valueOf());
    }

    login(username: string, password: string) {
        return this.http.post<TokenPackage>(`${environment.apiUrl}/auth`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }
}
