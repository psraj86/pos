import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Credential } from 'src/app/demo/service/auth.service';
import { JsonWebTokenService } from 'src/app/demo/service/json-web-token.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    valCheck: string[] = ['remember'];
    form: FormGroup;

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private jwtService: JsonWebTokenService
    ) {}
    ngOnInit(): void {
        this.form = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    signIn() {
        const credential: Credential = this.form.value;

        this.authService.signIn(credential).subscribe((res) => {
            localStorage.setItem('access_token', res.access_token);
            const user = this.jwtService.decode(res.access_token);
            if (user['user'].roles.includes('ROLE_ADMIN')) {
                this.router.navigate(['/dashboard']);
            } else {
                this.router.navigate(['/product']);
            }
        });
    }
}
