import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FileUploadProgress } from '../models/file-upload-progress';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  upload(vehicleId, photo): Observable<FileUploadProgress> {
    var formData = new FormData();
    formData.append('file', photo);

    return this.http.post(`/api/vehicles/${vehicleId}/photos`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            return this.fileUploadProgress(event);
          case HttpEventType.Response:
            return { body: event.body } as FileUploadProgress;
        }
      })
    );
  }

  getPhotos(vehicleId) {
    return this.http.get(`/api/vehicles/${vehicleId}/photos`);
  }

  private fileUploadProgress(event): FileUploadProgress {
    return {
      total: event.total,
      percentage: Math.round(event.loaded / event.total * 100)
    }
  }
}
