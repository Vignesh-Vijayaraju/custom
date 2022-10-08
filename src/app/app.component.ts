import { Component } from '@angular/core';
import { CrumpOptions } from './component/select/select.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'custom';
  options: CrumpOptions[] = [
    { value: 'danger', option: 'Danger', status: 'danger' },
    { value: 'disabled', option: 'Disabled', status: 'disabled' },
    { value: 'warning', option: 'Warning', status: 'warning' },
    { value: 'nothing', option: 'Nothing' },
    { value: 'nothings', option: 'Nothings' },
    { value: 'nothingness', option: 'Nothingness' },
    { value: 'forgiveness', option: 'Forgiveness' },
    { value: 'thankyou', option: 'Thank You' },
  ];
}
