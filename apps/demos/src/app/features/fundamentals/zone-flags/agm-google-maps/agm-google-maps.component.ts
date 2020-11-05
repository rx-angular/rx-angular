import { Component } from '@angular/core';

@Component({
  selector: 'rxa-agm-google-maps',
  template: `
    <rxa-visualizer style="position: relative">
      <div visualizerHeader>
        <h1>Random maps example default and wit zone flags</h1>
      </div>
      <agm-map
        style="width:100%; height: 400px;"
        [latitude]="lat"
        [longitude]="lng"
        [zoom]="zoom"
        [disableDefaultUI]="false"
        (mapClick)="mapClicked($event)">

        <agm-marker
          *ngFor="let m of markers; let i = index"
          (markerClick)="clickedMarker(m.label, i)"
          [latitude]="m.lat"
          [longitude]="m.lng"
          [label]="m.label"
          [markerDraggable]="m.draggable"
          (dragEnd)="markerDragEnd(m, $event)">

          <agm-info-window>
            <strong>InfoWindow content</strong>
          </agm-info-window>

        </agm-marker>

      </agm-map>
    </rxa-visualizer>
  `
})
export class AgmGoogleMapsComponent {

  zoom = 8;
  lat = 51.673858;
  lng = 7.815982;

  markers: any[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ];

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: any, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

}

