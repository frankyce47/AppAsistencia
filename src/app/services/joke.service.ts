import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JokeService {
  public apiUrl = 'https://v2.jokeapi.dev/joke/Programming?lang=es';

  constructor(private http: HttpClient) { }

  obtenerChisteProgramacion(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get(url);
  }
}
