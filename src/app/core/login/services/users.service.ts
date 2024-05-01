import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class UserApi{
    http = inject(HttpClient);

    public get<T>(){
        return this.http.get<T>(`https://jsonplaceholder.typicode.com/users/`);
    }
}