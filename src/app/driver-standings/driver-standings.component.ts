import {Component, OnInit} from '@angular/core';
import {ServerService} from '../server.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-driver-standings',
  templateUrl: './driver-standings.component.html',
  styleUrls: ['./driver-standings.component.css']
})
export class DriverStandingsComponent implements OnInit {

  constructor(
    private serverService: ServerService,
    private router: Router
  ) {}

  year = 2013;
  searchString = '';
  standings: any;
  filterStandings: any;

  ngOnInit() {
    this.serverService.getChampionshipStandings(this.year)
      .subscribe((data) => {
        this.standings = this.filterStandings = data;
      });
  }

  onSearchChange() {
    if (this.standings) {
      const q = this.searchString.toLowerCase();
      this.filterStandings = this.standings.filter(standing => (
        standing.position.toString().indexOf(q) > -1 ||
          standing.driver.toLowerCase().indexOf(q) > -1 ||
          standing.factory.toLowerCase().indexOf(q) > -1 ||
          standing.points.toString().indexOf(q) > -1
      ));
    }
  }

  onSelectDriver(standing) {
    const { driverId } = standing;
    this.router.navigate([`/driver/${driverId}`])
  }
}
