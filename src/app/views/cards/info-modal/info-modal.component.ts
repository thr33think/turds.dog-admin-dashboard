import { TurdApiService } from './../../../services/turds-api.service';
import { Marker } from './../../../interfaces/marker';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { ConfirmationComponent } from './confirmation/confirmation.component';

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
    @Inject(MAT_DIALOG_DATA) public marker: Marker,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.updateMap();
    this.updateMarkerPlaceholder.long = 0;
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.deleteMarker(this.marker);
    });
  }

  onNoClick(immediateUpdate): void {
    this.dialogRef.close({update: immediateUpdate, marker: this.marker});
  }

  convertEpocToReadableDate(timestamp: string): string {
    return moment.unix(parseInt(timestamp, 10) / 1000).format('DD.MM.YY HH:mm:ss');
  }

  toggleEditMode () {
    this.updateMarkerPlaceholder = { ...this.marker };
    this.editMode = !this.editMode;
  }

  async updateMarker () {
    const result = await this.turdApi.updateMarker({
      ...this.updateMarkerPlaceholder,
      visible: (String(this.updateMarkerPlaceholder.visible) === 'true')
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

  private updateMap()  {
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

  private deleteMarker(marker) {
    const deleteMarker = this.turdApi.deleteMarker(marker);
    this.snackBar.open('DELETE WAS SUCCESSFUL!', '👌 ', {
      duration: 3000
    });
    this.onNoClick(true);
  }

}
