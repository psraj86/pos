import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.navigateByUrl('/auth/login');
            return true;
        }
    } catch (err) {
        console.log(err);
        router.navigateByUrl('/auth/login');
        return false;
    }
    return true;
};
