import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MainGuard } from './guards/main.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: ':lang', children: [
            { path: '', component: HomeComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'products/:uuid', component: ProductComponent },
            { path: 'cart', component: CartComponent, canActivate: [MainGuard] },
            { path: 'contacts', component: ContactsComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'login', component: LoginComponent },
            { path: 'account', component: AccountComponent },
            { path: '**', redirectTo: "/" },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
