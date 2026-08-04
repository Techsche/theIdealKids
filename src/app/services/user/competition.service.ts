import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.prod';
import { Competition } from '../../core/models/user/event-details.model';

@Injectable({
  providedIn: 'root',
})
export class CompetitionService {
  private http = inject(HttpClient);

  private readonly apiUrl = environment.base;

  constructor() {}

  //   insertCompetition(competition: Competition) {
  //     return this.post(this.apiUrl + RestAPI.CREATE_COMPETITION, competition);
  //   }
  getCompetitions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}'/api/competitions`);
  }

  //   getCompetition(id: string) {
  //     return this.get(this.baseUrl + RestAPI.GET_COMPETITION + '/' + id);
  //   }
  //   updateCompetition(competition: Competition) {
  //     return this.put(this.baseUrl + RestAPI.UPDATE_COMPETITION + '/' + competition.id, competition);
  //   }
  //   deleteCompetition(id: string) {
  //     return this.delete(this.baseUrl + RestAPI.DELETE_COMPETITION + '/' + id);
  //   }
}
