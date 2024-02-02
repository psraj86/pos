import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/demo/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent {
    layoutService = inject(LayoutService);
    authService = inject(AuthService);
    fb = inject(FormBuilder);

    form: FormGroup;

    ngOnInit(): void {
        this.form = this.fb.group({
            username: [''],
            password: [''],
            email: [''],
            firstName: [''],
            lastName: [''],
        });
    }
    register() {
        this.authService.register(this.form.value).subscribe((res) => {
            console.log(res);
        });
    }
}
