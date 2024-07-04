import { Component } from '@angular/core';
import { SvgIconService } from './services/utils/svg-icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private svgService: SvgIconService) {
    this.svgService.init();
  }
}
