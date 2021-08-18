import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './home/intro/intro.component';
import { FooterComponent } from './footer/footer.component';
import { GetProductsService } from './product/data-products.service';
import { CategoriesComponent } from './product/categories/categories.component';

@NgModule({
    declarations: [
        AppComponent,
        ProductComponent,
        NavbarComponent,
        HomeComponent,
        IntroComponent,
        FooterComponent,
        CategoriesComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [GetProductsService],
    bootstrap: [AppComponent]
})
export class AppModule { }
