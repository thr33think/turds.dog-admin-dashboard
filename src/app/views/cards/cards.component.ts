import { ShowCards } from './options-bar/options-bar.component';
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
  visibleMarkers: Marker[];
  hiddenMarkers: Marker[];
  activeMarkers: Marker[];
  loading = true;

  constructor(private turdApi: TurdApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getMarkers();
  }

  async getMarkers () {
    this.loading = true;
    this.markers = [];
    this.visibleMarkers = [];
    this.hiddenMarkers = [];
    const markersWithoutImage = await this.turdApi.getMarkers();
    markersWithoutImage.reverse();
    for (const marker of markersWithoutImage){
      this.markers.push(await this.getMarkerWithImage(marker.id));
      if (marker.visible) {
        this.visibleMarkers.push(await this.getMarkerWithImage(marker.id));
      } else {
        this.hiddenMarkers.push(await this.getMarkerWithImage(marker.id));
      }
    }
    this.activeMarkers = this.markers.slice();
    this.loading = false;
  }

  async getMarkerWithImage( markerId: string ): Promise<Marker> {
    return await this.turdApi.getMarker(markerId);
  }

  convertEpocToReadableDate (timestamp: string): string {
    return moment.unix(parseInt(timestamp, 10) / 1000).format('DD.MM.YY HH:mm');
  }

  showMarkerDetails (marker: Marker) {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      width: '700px',
      data: marker
    });

    dialogRef.afterClosed().subscribe( (result: {update: boolean, marker: Marker}) => {
      /* This can be done more efficient without loading all markers - also doesn't work as expected lol*/
      if (result.update) {
        this.getMarkers();
      } else if (this.markers.indexOf(result.marker) === -1 && result.marker) {
        this.getMarkers();
      }
    });
  }

  toggleNonvisibleCards (showCards: ShowCards) {
    switch (showCards) {
      case ShowCards.ALL: this.activeMarkers = this.markers.slice();
        break;
      case ShowCards.VISIBLE: this.activeMarkers = this.visibleMarkers.slice();
        break;
      case ShowCards.HIDDEN: this.activeMarkers = this.hiddenMarkers.slice();
        break;
    }
  }
}

