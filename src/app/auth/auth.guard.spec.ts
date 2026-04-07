import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {User} from './user.model';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    guard = TestBed.get(AuthGuard);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user is authenticated', (done) => {
    const user = new User('test@test.com', '123', 'token', new Date(Date.now() + 3600000));
    authService.user.next(user);

    const result = guard.canActivate(null, null);
    (result as any).subscribe((value: any) => {
      expect(value).toBe(true);
      done();
    });
  });

  it('should return a UrlTree to /auth if user is not authenticated', (done) => {
    authService.user.next(null);

    const result = guard.canActivate(null, null);
    (result as any).subscribe((value: any) => {
      expect(value).not.toBe(true);
      expect(value.toString()).toContain('auth');
      done();
    });
  });
});
