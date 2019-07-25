import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { BrowserXhr } from '@angular/http';

@Injectable()
export class ProgressService {
  private uploadProgress: Subject<any>;

  startTraking() {
    this.uploadProgress = new Subject();
    return this.uploadProgress;
  };

  notify(progress) {
    console.log(progress);
    this.uploadProgress.next(progress);
  }

  endTracking() {
    this.uploadProgress.complete();
  }
}

@Injectable()
export class BrowserXhrWithProgress extends BrowserXhr {

  constructor(private service: ProgressService) { 
    super(); 
  }

  build(): XMLHttpRequest {
    var xhr: XMLHttpRequest = super.build();

    xhr.upload.onprogress = (event) => {
      this.service.notify(this.createProgress(event))
    };

    xhr.upload.onloadend = () => {
      this.service.endTracking();
    }

    return xhr;
  }

  private createProgress(event) {
    console.log(event);
    return {
      total: event.total,
      percentage: Math.round(event.loaded / event.total * 100)
    }
  }
}
