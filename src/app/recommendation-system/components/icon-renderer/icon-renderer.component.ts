import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-icon-renderer',
  templateUrl: './icon-renderer.component.html',
  styleUrls: ['./icon-renderer.component.scss']
})
export class IconRendererComponent implements ICellRendererAngularComp {
  params;
  label: string;
  tooltip: string;

  constructor() { }

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
    this.tooltip = this.params.tooltip;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data
      }
      this.params.onClick(params);
    }
  }
}
