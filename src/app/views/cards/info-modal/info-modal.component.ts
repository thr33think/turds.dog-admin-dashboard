import { TurdApiService } from './../../../services/turds-api.service';
import { Marker } from './../../../interfaces/marker';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';

declare const google: any;

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {

  editMode = false;
  updateMarkerPlaceholder = { ...this.marker };

  constructor(
    private turdApi: TurdApiService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<InfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public marker: Marker) { }

  ngOnInit() {
    this.updateMap();
    this.updateMarkerPlaceholder.long = 0;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  convertEpocToReadableDate(timestamp: string): string {
    return moment.unix(parseInt(timestamp, 10) / 1000).format('DD.MM.YY HH:mm:ss');
  }

  updateMap() {
    let map;
    let marker;
    const markerPosition = { lat: this.marker.lat, lng: this.marker.long };

    map = new google.maps.Map(document.getElementById('map'), {
      center: markerPosition,
      zoom: 16
    });

    marker = new google.maps.Marker({
      position: markerPosition,
      map: map,
      title: 'Hello World!'
    });
  }

  toggleEditMode () {
    this.updateMarkerPlaceholder = { ...this.marker };
    this.editMode = !this.editMode;
  }

  async updateMarker () {
    const result = await this.turdApi.updateMarker({
      ...this.updateMarkerPlaceholder,
      visible: this.convertStringToBool(this.updateMarkerPlaceholder.visible)
    });
    if (!result.error) {
      this.snackBar.open('UPDATE WAS SUCCESSFUL!', '👌 ', {
        duration: 3000
      });
      this.marker = result;
      this.updateMap();
      this.editMode = !this.editMode;
    } else {
      this.snackBar.open(result.result, '👎 ', {
        duration: 3000
      });
    }
  }

  private convertStringToBool (string: string | boolean): boolean {
    if (string === 'true') {
      return true;
    } else if (string === 'false') {
      return false;
    }
  }
}
