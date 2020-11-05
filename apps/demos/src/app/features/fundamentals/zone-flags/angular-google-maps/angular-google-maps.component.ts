import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { end, start } from '../../../../shared/utils/measure';

@Component({
  selector: 'rxa-angular-google-maps',
  template: `
    <rxa-visualizer style="position: relative">
      <div visualizerHeader>
        <h1>Maps example configured wit zone flags</h1>
      </div>
      <google-map id="map" (mousedown)="start()" (mouseup)="stop()" [center]="center">
        <map-marker [position]="marker" *ngFor="let marker of markers"></map-marker>
      </google-map>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularGoogleMapsComponent implements AfterViewInit {

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  markers: google.maps.LatLngLiteral[] = [
    {lat: 24, lng: 12}
    ];

  // @ViewChild('map')
  map: HTMLElement;

  ngAfterViewInit() {
    this.map = document.getElementById('map')
    const down: any = document.createEvent("HTMLEvents");
    down.initEvent("mousedown", true, true);
    down.eventName = "mousedown";
    const move: any = document.createEvent("HTMLEvents");
    move.initEvent("mousemove", true, true);
    move.eventName = "mousemove";
   // this.map.dispatchEvent(down);
  }

  start() {
    start('drag')
  }
  stop() {
    end('drag')
  }
}

