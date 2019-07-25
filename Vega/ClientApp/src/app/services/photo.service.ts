import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  upload(vehicleId, photo) {
    var formData = new FormData();
    formData.append('file', photo);

    return this.http.post(`/api/vehicles/${vehicleId}/photos`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getPhotos(vehicleId) {
    return this.http.get(`/api/vehicles/${vehicleId}/photos`);
  }
}
