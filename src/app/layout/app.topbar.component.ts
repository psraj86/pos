import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';
import { JsonWebTokenService } from '../demo/service/json-web-token.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    user: any;
    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private jwtService: JsonWebTokenService
    ) {}

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        if (!this.user) {
            const token = localStorage.getItem('access_token');
            this.jwtService.decode(token);
        }
        //this.jwtService.user.subscribe((user) => (this.user = user));
        this.user = this.jwtService.user;
    }

    signOut() {
        localStorage.removeItem('access_token');
        this.router.navigate(['auth/login']);
    }

    showDashboard() {
        return this.user?.user?.roles?.includes('ROLE_ADMIN');
    }
}
