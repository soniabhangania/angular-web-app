import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  };
  address: {
    city: string;
    zipcode: string;
  };
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Analytics {
  totalUsers: number;
  totalPosts: number;
  averagePostsPerUser: number;
  topCompanies: string[];
  citiesDistribution: { [key: string]: number };
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  }

  getUserPosts(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts?userId=${userId}`);
  }

  getAnalytics(): Observable<Analytics> {
    return forkJoin({
      users: this.getUsers(),
      posts: this.getPosts()
    }).pipe(
      map(({ users, posts }) => {
        const totalUsers = users.length;
        const totalPosts = posts.length;
        const averagePostsPerUser = totalPosts / totalUsers;
        
        const companies = users.map(user => user.company.name);
        const topCompanies = [...new Set(companies)].slice(0, 5);
        
        const citiesDistribution = users.reduce((acc, user) => {
          acc[user.address.city] = (acc[user.address.city] || 0) + 1;
          return acc;
        }, {} as { [key: string]: number });

        return {
          totalUsers,
          totalPosts,
          averagePostsPerUser: Math.round(averagePostsPerUser * 10) / 10,
          topCompanies,
          citiesDistribution
        };
      })
    );
  }
}