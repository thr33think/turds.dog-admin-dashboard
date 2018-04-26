import { Component, OnInit, Inject } from '@angular/core';
import { TurdApiService } from '../../services/turds-api.service';
import { Markers, Marker } from './../../interfaces/marker';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { InfoModalComponent } from './info-modal/info-modal.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  markers: Marker[] = [];
  loading = true;

  constructor(private turdApi: TurdApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getMarkers();
  }

  async getMarkers () {
    this.loading = true;
    this.markers = [];
    const markersWithoutImage = await this.turdApi.getMarkers();
    for (const marker of markersWithoutImage){
      this.markers.push(await this.getMarkerWithImage(marker.id));
    }
    this.markers.reverse();
    this.loading = false;
  }

  async getMarkerWithImage( markerId: string ): Promise<Marker> {
    const marker = await this.turdApi.getMarker(markerId);
    return marker;
  }

  convertEpocToReadableDate (timestamp: string): string {
    return moment.unix(parseInt(timestamp, 10) / 1000).format('DD.MM.YY HH:mm');
  }

  showMarkerDetails (marker: Marker) {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      width: '700px',
      data: marker
    });

    dialogRef.afterClosed().subscribe((result) => {
      /* When image deletion is active, we should re-render all the cards*/
      console.log('The dialog was closed', result);
    });
  }
}

