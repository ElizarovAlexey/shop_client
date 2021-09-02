import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ContactsComponent } from './contacts/contacts.component';
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
            { path: 'cart', component: CartComponent },
            { path: 'contacts', component: ContactsComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'login', component: LoginComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
