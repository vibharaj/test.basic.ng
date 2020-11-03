
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Nation } from '../model/nation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit,OnDestroy
{
    nations: Nation[] = [];
    hilitedName = '...';

    constructor(
        private http:HttpClient,
        private changeDetectorRef:ChangeDetectorRef ) {}

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
        this.changeDetectorRef.detectChanges();
    }

    ngOnDestroy(): void {
    }
}
