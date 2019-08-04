import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { VehicleService } from '../services/vehicle.service';
import { PhotoService } from '../services/photo.service';

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
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    var file = nativeElement.files[0];
    nativeElement.value = '';

    this.photoService.upload(this.vehicleId, file)
      .subscribe(result => {
          if (!result) {
            return;
          }

          if (result.total) {
            this.zone.run(() => {
              this.progress = result
            });
          } else if (result.body) {
            console.log('File is completely uploaded!');
            this.photos.push(result.body);
          }
        },
        err => {
          this.toastyService.error({
            title: 'Error',
            msg: err.error,
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
        }
    );
  }
}
