import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ProductOverviewComponent } from './products/product-overview/product-overview.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-overview/product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { PicsTopComponent } from './home/pics-top/pics-top.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductFilter} from "./shared/pipes/product-filter";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {MatInputModule} from "@angular/material/input";
import { UserinfoComponent } from './auth/userinfo/userinfo.component';
import {CustomStyleModule} from "./shared/modules/custom-style/custom-style.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {AuthInterceptor} from "./shared/interceptors/auth.interceptor";
import {ProductsService} from "./shared/services/products.service";
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { CommentDialogComponent } from './purchase-history/comment-dialog/comment-dialog.component';
import { AnalysisComponent } from './admin/analysis/analysis.component';
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import { PurchaseComponent } from './admin/purchase/purchase.component';
import { UsersComponent } from './admin/users/users.component';
import { AllProductsComponent } from './admin/all-products/all-products.component';
import { UpdateProductComponent } from './admin/all-products/update-product/update-product.component';
import { UpdateQuantityComponent } from './cart/update-quantity/update-quantity.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatExpansionModule} from "@angular/material/expansion";
import { ReviewsComponent } from './admin/reviews/reviews.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { CancelDialogComponent } from './purchase-history/cancel-dialog/cancel-dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { StatusDialogComponent } from './admin/purchase/status-dialog/status-dialog.component';
import { AddProductsComponent } from './admin/add-products/add-products.component';
import {provideFirebaseApp, getApp, initializeApp} from "@angular/fire/app";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {environment} from "../environments/environment.development";
import {AngularFireModule} from "@angular/fire/compat";


const firebaseConfig = {
  apiKey: "AIzaSyCTMLHb9yR_V3n4Tt-VrOVdUCbKYwD60xY",
  authDomain: "l-watch-micro.firebaseapp.com",
  databaseURL: "https://l-watch-micro-default-rtdb.firebaseio.com",
  projectId: "l-watch-micro",
  storageBucket: "l-watch-micro.appspot.com",
  messagingSenderId: "995060743151",
  appId: "1:995060743151:web:aadaf69ff6d40f5469d41a"
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductOverviewComponent,
    ProductsComponent,
    ProductDetailComponent,
    HomeComponent,
    FooterComponent,
    PicsTopComponent,
    ProductFilter,
    LoginComponent,
    RegisterComponent,
    UserinfoComponent,
    CartComponent,
    CheckoutComponent,
    PurchaseHistoryComponent,
    CommentDialogComponent,
    AnalysisComponent,
    PurchaseComponent,
    UsersComponent,
    AllProductsComponent,
    UpdateProductComponent,
    UpdateQuantityComponent,
    ReviewsComponent,
    FavoriteComponent,
    CancelDialogComponent,
    StatusDialogComponent,
    AddProductsComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CustomStyleModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        NgbModule,
        MatExpansionModule,
        MatCheckboxModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
        provideFirebaseApp(()=> initializeApp(firebaseConfig)),
      provideFirestore(()=>getFirestore()),
      provideAuth(()=>getAuth()),
      provideStorage(()=>getStorage())


    ],
  providers: [
    ProductsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
