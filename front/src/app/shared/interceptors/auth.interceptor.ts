import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if(token){
            req = req.clone({
                // authorization: "Bearer token" <- industry level standard
                //         (If don't do this, backend doesn't know that doesn't get token)
                setHeaders:{ authorization: `Bearer ${token}`}
            });
        }
        return next.handle(req);
    }
}
