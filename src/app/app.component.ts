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
   * Check if the key being inputted is a valid key and if the input field has a valid value after pressing
   */
  validateInput(event: any) {
    const keyCode = event.which;
    const isValidInput = this.isValidInput(event.which);
    if (!isValidInput) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }

    const numberKeys = this.isNumberKeys(event.which);
    const fieldValue = event.target.value; 

    if (fieldValue.length > 1 && numberKeys) {
      event.target.value = "59";
      event.stopPropagation();
      event.preventDefault();
      return;
    }
  }

  private isNumberKeys(keyCode: number) {
    return (keyCode > 47 && keyCode < 58);
  }

  private isValidInput(keyCode: number) {
    const arrowKeys = (keyCode >= 37 && keyCode<= 40);
    const deleteKey = keyCode === 46;
    const backspaceKey = keyCode === 8;

    return arrowKeys || this.isNumberKeys(keyCode) || deleteKey|| backspaceKey;
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

  get secondsVal() {
    return this.seconds > 0 ? this.seconds : '';
  }

  get minutesVal() {
    return this.minutes > 0 ? this.minutes : '';
  }

}

/**
 * EDIT - Currently editing the timer
 * READY - Values are locked, can start the timer
 */
 enum TimerMode {
  EDIT, READY
}