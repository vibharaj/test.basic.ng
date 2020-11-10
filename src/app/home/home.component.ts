
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Nation } from '../model/nation';
import { Location } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fade', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate(2000, style({opacity: 1}))
      ]) 
    ])
   ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit,OnDestroy
{
    nations: Nation[] = [];
    hilitedName = '...';
    hilitedCapital = '...';
    hilitedNativeName = '...';
    hilitedLatitude = 0.0;
    hilitedLongitude = 0.0;
    flag : string = '...';
    count:number = 10;
    lat = 40.730610;
    lng = -73.935242;

    constructor(
        private http:HttpClient,
        private changeDetectorRef:ChangeDetectorRef,
        private location:Location) {}

    ngOnInit(): void {
        this.http.get<Nation[]>( 'assets/data.json' )
            .pipe()
            .subscribe( (nations:Nation[]) => {
                this.nations = nations ? nations : [];
                this.changeDetectorRef.detectChanges();
            } );
        
    }

    hilite( nation:Nation ) {
        this.hilitedName = nation.name;
        this.hilitedCapital = nation.capital;
        this.hilitedNativeName = nation.nativeName;
        this.hilitedLatitude = nation.latlng[0];
        this.hilitedLongitude = nation.latlng[1];

        this.changeDetectorRef.detectChanges();
    }

    FillNationInfo( nation:Nation ) {
        this.hilitedName = nation.name;
        this.hilitedCapital = nation.capital;
        this.hilitedNativeName = nation.nativeName;
        this.hilitedLatitude = nation.latlng[0];
        this.hilitedLongitude = nation.latlng[1];
        this.flag = nation.flag;
        this.location.replaceState(nation.alpha3Code)

        this.lat =  this.hilitedLatitude;
        this.lng = this.hilitedLongitude;

        this.changeDetectorRef.detectChanges();
    }

    ngOnDestroy(): void {
    }
}
