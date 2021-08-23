import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './home/intro/intro.component';
import { FooterComponent } from './footer/footer.component';
import { GetProductsService } from './products/data-products.service';
import { CategoriesComponent } from './products/categories/categories.component';
import { PaginatorModule } from 'primeng/paginator';
import { ProductComponent } from './product/product.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    declarations: [
        AppComponent,
        ProductsComponent,
        NavbarComponent,
        HomeComponent,
        IntroComponent,
        FooterComponent,
        CategoriesComponent,
        ProductComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        PaginatorModule,
        SelectButtonModule,
        AccordionModule,
        BrowserAnimationsModule,
    ],
    providers: [GetProductsService],
    bootstrap: [AppComponent]
})
export class AppModule { }
