import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SaveVehicle } from '../models/vehicle';
//import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getMakes() {
    return this.http.get('/api/makes');
  }

  getFeatures() {
    return this.http.get('/api/features');
  }

  create(vehicle) {
    return this.http.post('/api/vehicles', vehicle);
  }

  getVehicle(id) {
    return this.http.get('/api/vehicles/' + id);
  }

  update(vehicle: SaveVehicle) {
    return this.http.put('/api/vehicles/' + vehicle.id, vehicle);
  }

  delete(id) {
    return this.http.delete('/api/vehicles/' + id);
  }
}
