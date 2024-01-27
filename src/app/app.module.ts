import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routing';
import { LandingComponent } from './components/landing/landing.component';
import { ImageSliderModule } from './imageSlider/imageSlider.module';
import { SlowScrollDirective } from './directives/slow-scroll.directive';
import { ShopComponent } from './components/shop/shop.component';
import { MenuComponent } from './components/menu/menu.component';
import { CardComponent } from './components/card/card.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    SignInComponent,
    LandingComponent,
    SlowScrollDirective,
    ShopComponent,
    MenuComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    ImageSliderModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
