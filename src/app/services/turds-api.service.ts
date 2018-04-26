import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Marker, Markers } from '../interfaces/marker';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TurdApiService {

  constructor(private http: HttpClient) { }

  async getMarkers(): Promise<Markers[]>  {
    const markers = await this.http.get<Markers[]>(`${environment.apiUrl}/turds`, {
      headers: new HttpHeaders().set('Authorization', 'Basic YXBwOmpCSDNKSnZnN0d1VTFIQ00zZkxuSnQxQXE=')
    }).toPromise();
    return markers;
  }

  async getMarker(id: string): Promise<Marker> {
    const marker = await this.http.get<Marker>(`${environment.apiUrl}/turds/${id}`, {
      headers: new HttpHeaders().set('Authorization', 'Basic YXBwOmpCSDNKSnZnN0d1VTFIQ00zZkxuSnQxQXE=')
    }).toPromise();
    return marker;
  }

  async updateMarker(marker: Marker): Promise<Marker> {
    let upload;
    try {
      upload = await this.http.patch(`${environment.apiUrl}/turds/${marker.id}`, marker, {
        headers: new HttpHeaders().set('Authorization', 'Basic YXBwOmpCSDNKSnZnN0d1VTFIQ00zZkxuSnQxQXE=')
      }).toPromise();
    } catch (error) {
      console.log(error.message);
      upload = { error: true, result: error.message };
    }
    return upload;
  }
}
