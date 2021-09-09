import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './home/intro/intro.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriesComponent } from './products/categories/categories.component';
import { PaginatorModule } from 'primeng/paginator';
import { ProductComponent } from './product/product.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactsComponent } from './contacts/contacts.component';
import { RegisterComponent } from './register/register.component';
import { ValidationErrorShowModule } from './validation-error-show/validation-error-show.module';
import { LoginComponent } from './login/login.component';
import { AppInterceptor } from './interceptors/app.interceptor';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AccountComponent } from './account/account.component';



@NgModule({
    declarations: [
        AppComponent,
        ProductsComponent,
        NavbarComponent,
        HomeComponent,
        IntroComponent,
        FooterComponent,
        CategoriesComponent,
        ProductComponent,
        CartComponent,
        ContactsComponent,
        RegisterComponent,
        LoginComponent,
        AccountComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        PaginatorModule,
        SelectButtonModule,
        AccordionModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        ValidationErrorShowModule,
        MessageModule,
        MessagesModule,
        ToastModule
    ],
    providers: [
        MessageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
