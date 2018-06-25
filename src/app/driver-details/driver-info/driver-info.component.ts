import { Component, OnInit } from '@angular/core';
import {ServerService} from '../../server.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.css']
})
export class DriverInfoComponent implements OnInit {
  driverInfo: any;

  constructor(
    private route: ActivatedRoute,
    private serverService: ServerService
  ) { }

  setData(driverId) {
    this.serverService.getDriverInfo(driverId)
      .subscribe((data) => {
        this.driverInfo = data;
      });
  }

  ngOnInit() {
    const driverId = this.route.snapshot.params['id'];
    this.setData(driverId);
    this.route.params.subscribe(
      (params: Params) => {
        this.setData(params['id']);
      }
    );
    this.serverService.getDriverTeam.subscribe(
      (team: string) => {
        this.driverInfo.team = team;
      }
    );
  }

}
