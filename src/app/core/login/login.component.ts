import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import {
  Validator,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserApi } from './services/users.service';
import { UserDTOI } from './services/users-interface';
import {
  Observable,
  catchError,
  delay,
  filter,
  first,
  map,
  of,
  take,
  takeWhile,
  tap,
  throwError,
  timeout,
  timer,
} from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public readonly input = new FormControl('', Validators.required);
  public isLoading = false;
  public isError = false;
  private timeLeft: number = 60;
  public user$: Observable<unknown> | null = null;
  private timer = timer(1000, 1000);
  public vmTimer: number = this.timeLeft;
  private readonly usersApi = inject(UserApi);

  startTimer() {
    this.isLoading = true;
    this.timer.pipe(take(this.timeLeft + 1)).subscribe((time) => {
      this.vmTimer = this.timeLeft - time;
      if (this.vmTimer == 0) this.isLoading = false;
    });
  }

  public onSubmit() {
    if (!this.input.valid) return;
    this.user$ = this.usersApi.get<UserDTOI[]>().pipe(
      first(),
      map((users) => users.filter((elem) => elem.username == this.input.value)),
      // тут можно было написать поменьше, но это спицифика api,
      // могу делать запрос только за всеми users
      tap((a) => (this.isError = true)),
      map((user) => {
        if (user.length == 1) {
          return user[0].username;
        } else {
          throw of('Пользователь не найден!');
        }
      }),
      catchError((err: Observable<string>) => {
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
        }, 5000);
        return err;
      })
    );

    this.startTimer();
  }
}
