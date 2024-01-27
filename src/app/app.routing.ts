import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { LandingComponent } from './components/landing/landing.component';
import { ShopComponent } from './components/shop/shop.component';
import { MenuComponent } from './components/menu/menu.component';

export const APP_ROUTES: Routes = [
    { path: 'cart', component: CartComponent },
    { path: 'sign-in', component: SignInComponent },
    {
        path: 'shop', component: ShopComponent, children: [
            { path: 'search', component: ShopComponent,  },
          ] },
    {path:'menu', component:MenuComponent},
    {path:'', component: LandingComponent},
]