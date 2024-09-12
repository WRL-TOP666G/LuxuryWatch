import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {ProductDetailComponent} from "./products/product-overview/product-detail/product-detail.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {UserinfoComponent} from "./auth/userinfo/userinfo.component";
import {CartComponent} from "./cart/cart.component";
import {CheckoutComponent} from "./cart/checkout/checkout.component";
import {PurchaseHistoryComponent} from "./purchase-history/purchase-history.component";
import {AnalysisComponent} from "./admin/analysis/analysis.component";
import {PurchaseComponent} from "./admin/purchase/purchase.component";
import {UsersComponent} from "./admin/users/users.component";
import {AllProductsComponent} from "./admin/all-products/all-products.component";
import {ReviewsComponent} from "./admin/reviews/reviews.component";
import {FavoriteComponent} from "./favorite/favorite.component";
import {AddProductsComponent} from "./admin/add-products/add-products.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'userinfo/:id',
    component: UserinfoComponent
  },
  {
    path:'favorite',
    component: FavoriteComponent
  },
  {
    path:'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'purchase-history',
    component: PurchaseHistoryComponent
  },
  {
    path: 'analysis',
    component: AnalysisComponent
  },
  {
    path:'purchase',
    component: PurchaseComponent
  },
  {
    path:'users',
    component: UsersComponent
  },
  {
    path:'all-products',
    component:AllProductsComponent
  },
  {
    path:'add-products',
    component:AddProductsComponent
  },
  {
    path:'reviews',
    component: ReviewsComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
