import {Component, Input, OnInit} from '@angular/core';
import {ServerService} from '../../server.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-driver-season',
  templateUrl: './driver-season.component.html',
  styleUrls: ['./driver-season.component.css']
})
export class DriverSeasonComponent implements OnInit {
  @Input() year: number;
  driverSeason: any;
  sortedBy = '';
  sortAsc = false;

  constructor(
    private route: ActivatedRoute,
    private serverService: ServerService
  ) { }

  setData(driverId) {
    this.serverService.getDriverSeason(driverId)
      .subscribe((data) => {
        this.driverSeason = data;
        this.serverService.getDriverTeam.next(data[0].team);
      });
  }

  sortData(column: string) {
    if (this.driverSeason) {
      const isString = ['grandPrix', 'team'].indexOf(column) > -1;
      const isNumber = ['round', 'grid', 'race'].indexOf(column) > -1;
      if (this.sortedBy === column) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortedBy = column;
        this.sortAsc = true;
      }
      this.driverSeason.sort((a, b) => {
        let pa = a[column];
        let pb = b[column];
        if (!this.sortAsc) {
          const c = pa;
          pa = pb;
          pb = c;
        }
        if (isString) {
          pa = pa.toUpperCase();
          pb = pb.toUpperCase();
          if (pa < pb) {
            return -1;
          }
          if (pa > pb) {
            return 1;
          }
          return 0;
        } else if (isNumber) {
          return pa - pb;
        }
      });
    }
  }

  getSortIcon(column: string) {
    return this.sortedBy === column ? this.sortAsc ? 'arrow_drop_up' : 'arrow_drop_down' : '';
  }

  ngOnInit() {
    const driverId = this.route.snapshot.params['id'];
    this.setData(driverId);
    this.route.params.subscribe(
      (params: Params) => {
        this.setData(params['id']);
      }
    );
  }

}
