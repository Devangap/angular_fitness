import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Trainer } from './trainer';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private apiServerUrl = 'http://localhost:8080'; // Update the URL as needed

  constructor(private http: HttpClient) {}


  public getTrainer(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(`${this.apiServerUrl}/trainer/all`);
  }

  public addTrainer(trainer: Trainer): Observable<Trainer> {
    return this.http.post<Trainer>(`${this.apiServerUrl}/trainer/add`, trainer);
  }

  public updateTrainer(trainer: Trainer): Observable<Trainer> {
    return this.http.put<Trainer>(`${this.apiServerUrl}/trainer/update`, trainer);
    catchError(this.handleError)
  }

  public deleteTrainer(trainerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/trainer/delete/${trainerId}`);
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`Backend returned code ${error.status}, body was: ${error.message}`);
    return throwError('Something went wrong; please try again later.');
  }
}
