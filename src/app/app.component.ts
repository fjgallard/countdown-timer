import { DecimalPipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /**
   * Track the minutes and seconds fields
   */
  @ViewChild('minuteField')
  minutesField: ElementRef | undefined;

  @ViewChild('secondField')
  secondsField:  ElementRef | undefined;

  /**
   * track the values
   */
  minutes: number;
  seconds: number;

  constructor(private decimalPipe: DecimalPipe) {
    this.minutes = 0;
    this.seconds = 0;
  }

  /**
   * Placeholders for the input field - formatted to have the same number of digits as the
   * stopwatch display, with the m/s suffixes.
   */
  get minutesPlaceholder() {
    return this.decimalPipe.transform(this.minutes, '2.0') + 'm';
  }

  get secondsPlaceholder() {
    return this.decimalPipe.transform(this.seconds, '2.0') + 's';
  }

}
