import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'ba-card-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-panel.component.html',
  styleUrls: ['./card-panel.component.scss']
})
export class CardPanelComponent {

  @Input({required: true})
  title!: string;
}
