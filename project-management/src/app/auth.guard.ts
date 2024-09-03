import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('token');
  const router = inject(Router);
  
  if (token) {
    return true;
  } 
  else {
    alert("You are not logged in.")
    router.navigate(['/']);
    return false;
  }

};
