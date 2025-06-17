import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RxEffects } from '@rx-angular/state/effects';

@Component({
  selector: 'rxa-ngif-hack-container',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>*ngIf hack</h2>
        <mat-button-toggle-group
          name="visibleExamples"
          aria-label="Visible Examples"
          [value]="displayStates.all"
          #group="matButtonToggleGroup"
        >
          <mat-button-toggle [value]="displayStates.ngIf"
            >ngIf</mat-button-toggle
          >
          <mat-button-toggle [value]="displayStates.ngIfAsync"
            >ngIf + async</mat-button-toggle
          >
          <mat-button-toggle [value]="displayStates.ngIfPush"
            >ngIf + push</mat-button-toggle
          >
          <mat-button-toggle [value]="displayStates.rxLet"
            >rxlet</mat-button-toggle
          >
          <mat-button-toggle [value]="displayStates.all">All</mat-button-toggle>
        </mat-button-toggle-group>
        <br />
        <button mat-raised-button (click)="isVisible = !isVisible">
          Toggle All
        </button>
      </div>
      @if (isVisible) {
        <div class="w-100 row">
          @if (
            group.value === displayStates.ngIf ||
            group.value === displayStates.all
          ) {
            <div class="col">
              <rxa-ngif-hack-static></rxa-ngif-hack-static>
            </div>
          }
          @if (
            group.value === displayStates.ngIfAsync ||
            group.value === displayStates.all
          ) {
            <div class="col">
              <rxa-ngif-hack-ng-if-async></rxa-ngif-hack-ng-if-async>
            </div>
          }
          @if (
            group.value === displayStates.ngIfPush ||
            group.value === displayStates.all
          ) {
            <div class="col">
              <rxa-ngif-hack-ng-if-push></rxa-ngif-hack-ng-if-push>
            </div>
          }
          @if (
            group.value === displayStates.rxLet ||
            group.value === displayStates.all
          ) {
            <div class="col">
              <rxa-ngif-hack-rx-let></rxa-ngif-hack-rx-let>
            </div>
          }
        </div>
      }
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NgIfHackComponent {
  isVisible = true;

  displayStates = {
    none: 0,
    all: 1,
    ngIf: 2,
    ngIfAsync: 3,
    ngIfPush: 4,
    rxLet: 5,
  };
}
