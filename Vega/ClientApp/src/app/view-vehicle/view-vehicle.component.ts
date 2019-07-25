import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { VehicleService } from '../services/vehicle.service';
import { PhotoService } from '../services/photo.service';
import { ProgressService } from '../services/progress.service';
import { HttpEventType, HttpResponse, HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  vehicle: any;
  vehicleId: number;
  photos: any[];
  progress: any;

  constructor(
    private zone: NgZone,
    private vehicleService: VehicleService,
    private photoService: PhotoService,
    private toastyService: ToastyService,
    private route: ActivatedRoute,
    private progressService: ProgressService,
    private router: Router) {

    route.params.subscribe(p => {
      this.vehicleId = +p["id"]; //Plus to convert to number

      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return;
      }
    });
  }

  ngOnInit() {
    this.photoService.getPhotos(this.vehicleId)
      .subscribe((photos: any) => this.photos = photos);

    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return;
          }
        });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        });
    }
  }

  uploadPhoto() {
    this.progressService.startTraking()
      .subscribe(progress => {
        console.log(progress);
        this.zone.run(() => {
          this.progress = progress;
        });          
      },
      null,
      () => { this.progress = null; });

    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    var file = nativeElement.files[0];
    nativeElement.value = '';

    this.photoService.upload(this.vehicleId, file)
      .subscribe(event => {
        console.log(event);

        // Via this API, you get access to the raw event stream.
        // Look for upload progress events.
        if (event.type === HttpEventType.UploadProgress) {
          this.zone.run(() => {
            this.progress = {
              total: event.total,
              percentage: Math.round(event.loaded / event.total * 100)
            }
          });
          console.log(this.progress);

        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
          this.photos.push(event.body);
        }        
      },
      err =>  {
        this.toastyService.error({
          title: 'Error',
          msg: err.text(),
          theme: 'bootstrap',
          showClose: true,
          timeout: 5000
        });
      });
  }
}
