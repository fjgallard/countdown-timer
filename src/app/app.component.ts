import { DecimalPipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';

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

  /**
   * Track the timer mode.
   */
   mode: TimerMode;

   /**
   * Don't change modes clicking the input field while editing
   */
  isEditing: boolean;


  constructor(private decimalPipe: DecimalPipe, private cdRef:ChangeDetectorRef) {
    this.minutes = 0;
    this.seconds = 0;

    this.mode = TimerMode.READY;
    this.isEditing = false;
  }

  setToReady() {
    if (this.isEditable && !this.isEditing) {
      this.mode = TimerMode.READY;
      this.minutes = this.minutesField?.nativeElement.value || 0;
      this.seconds = this.secondsField?.nativeElement.value || 0;
    }

    this.isEditing = false;
  }

  setToEditable() {
    this.isEditing = true;

    if (this.isReady) {
      this.mode = TimerMode.EDIT;
      this.cdRef.detectChanges();
      this.secondsField?.nativeElement.focus();
    }
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

  get isEditable() {
    return this.mode === TimerMode.EDIT;
  }

  get isReady() {
    return this.mode === TimerMode.READY;
  }

}

/**
 * EDIT - Currently editing the timer
 * READY - Values are locked, can start the timer
 */
 enum TimerMode {
  EDIT, READY
}