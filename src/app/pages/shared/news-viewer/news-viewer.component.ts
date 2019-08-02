import { Component, Input } from '@angular/core';
import { NewMessage } from 'src/app/models/models';

@Component({
  selector: 'app-news-viewer',
  templateUrl: './news-viewer.component.html',
  styleUrls: [],
})
export class NewsViewerComponent {

  @Input() news: NewMessage[] = [];

  constructor() { }
}
