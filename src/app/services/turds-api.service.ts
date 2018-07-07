import { Injectable } from '@angular/core';
import { Marker, Markers } from '../interfaces/marker';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TurdApiService {

  constructor(private http: HttpClient) { }

  async getMarkers(): Promise<Markers[]>  {
    const markers = await this.http.get<Markers[]>(`${environment.apiUrl}/turds`).toPromise();
    return markers;
  }

  async getMarker(id: string): Promise<Marker> {
    const marker = await this.http.get<Marker>(`${environment.apiUrl}/turds/${id}`).toPromise();
    return marker;
  }

  async updateMarker(marker: Marker): Promise<Marker> {
    let upload;
    try {
      upload = await this.http.patch(`${environment.apiUrl}/turds/${marker.id}`, marker).toPromise();
    } catch (error) {
      console.log(error.message);
      upload = { error: true, result: error.message };
    }
    return upload;
  }

  async deleteMarker(marker: Marker): Promise<any> {
    let upload;
    try {
      upload = await this.http.delete(`${environment.apiUrl}/turds/${marker.id}`, {
        headers: new HttpHeaders().set('Authorization', environment.authToken)
      }).toPromise();
    } catch (error) {
      console.log(error.message);
      upload = { error: true, result: error.message };
    }
    return upload;
  }
}
