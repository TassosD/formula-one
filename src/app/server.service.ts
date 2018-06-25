import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Standing} from './driver-standings/standing.model';
import {DriverInfo} from './driver-details/driver-info.model';
import {DriverRace} from './driver-details/driver-race.model';
import {Subject} from 'rxjs';

@Injectable()
export class ServerService {
  constructor(private http: HttpClient) {}

  getChampionshipStandings(year) {
    return this.http.jsonp(`http://ergast.com/api/f1/${year}/driverStandings.json`, 'callback')
      .pipe(map(
        (response: any) => {
          const rawStandings = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
          const standings: Standing[] = rawStandings.map(rawItem => (
            new Standing(
              rawItem.position,
              rawItem.Driver.driverId,
              `${rawItem.Driver.givenName} ${rawItem.Driver.familyName}`,
              rawItem.Constructors[0].name,
              rawItem.points
            )
          ));
          return standings;
        }
      ));
  }

  getDriverInfo(driverId) {
    return this.http.jsonp(`http://ergast.com/api/f1/drivers/${driverId}.json`, 'callback')
      .pipe(map(
        (response: any) => {
          const driverData = response.MRData.DriverTable.Drivers[0];
          const driverInfo: DriverInfo = new DriverInfo(
            `${driverData.givenName} ${driverData.familyName}`,
            driverData.nationality,
            '',
            driverData.dateOfBirth,
            driverData.url
          );
          return driverInfo;
        }
      ));
  }

  getDriverSeason(driverId) {
    return this.http.jsonp(`http://ergast.com/api/f1/2013/drivers/${driverId}/results.json`, 'callback')
      .pipe(map(
        (response: any) => {
          const seasonData = response.MRData.RaceTable.Races;
          const seasonInfo: DriverRace[] = seasonData.map(race => (
            new DriverRace(
              race.round,
              race.raceName,
              race.Results[0].Constructor.name,
              race.Results[0].grid,
              race.Results[0].position
            )
          ));
          return seasonInfo;
        }
      ));
  }

  getDriverTeam = new Subject();
}
