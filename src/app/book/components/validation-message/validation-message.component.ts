import {Component, HostBinding, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'ba-validation-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent {

  @HostBinding("class.invalid-feedback")
  isValidClass = true;

  @Input({alias: 'of', required: true})
  control!: AbstractControl | null
}
