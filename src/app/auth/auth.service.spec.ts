import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from './auth.service';
import {User} from './user.model';
import {Router} from '@angular/router';
import {PLATFORM_ID} from '@angular/core';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: PLATFORM_ID, useValue: 'browser'}
      ]
    });
    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('userData');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a null user initially', (done) => {
    service.user.subscribe(user => {
      expect(user).toBeNull();
      done();
    });
  });

  it('should send a signup request', () => {
    service.signUp('test@test.com', 'password123').subscribe();
    const req = httpMock.expectOne((r) => r.url.includes('accounts:signUp'));
    expect(req.request.method).toBe('POST');
    expect(req.request.body.email).toBe('test@test.com');
    expect(req.request.body.password).toBe('password123');
    expect(req.request.body.returnSecureToken).toBe(true);
    req.flush({
      idToken: 'token123',
      email: 'test@test.com',
      refreshToken: 'refresh',
      expiresIn: '3600',
      localId: 'user123'
    });
  });

  it('should send a login request', () => {
    service.logIn('test@test.com', 'password123').subscribe();
    const req = httpMock.expectOne((r) => r.url.includes('accounts:signInWithPassword'));
    expect(req.request.method).toBe('POST');
    expect(req.request.body.email).toBe('test@test.com');
    req.flush({
      idToken: 'token123',
      email: 'test@test.com',
      refreshToken: 'refresh',
      expiresIn: '3600',
      localId: 'user123'
    });
  });

  it('should set user after successful login', (done) => {
    service.logIn('test@test.com', 'password123').subscribe(() => {
      service.user.subscribe(user => {
        expect(user).toBeTruthy();
        expect(user.email).toBe('test@test.com');
        done();
      });
    });

    const req = httpMock.expectOne((r) => r.url.includes('accounts:signInWithPassword'));
    req.flush({
      idToken: 'token123',
      email: 'test@test.com',
      refreshToken: 'refresh',
      expiresIn: '3600',
      localId: 'user123'
    });
  });

  it('should clear user on logout', () => {
    spyOn(router, 'navigate');
    service.logout();
    service.user.subscribe(user => {
      expect(user).toBeNull();
    });
    expect(router.navigate).toHaveBeenCalledWith(['/auth']);
  });

  it('should remove userData from localStorage on logout', () => {
    localStorage.setItem('userData', JSON.stringify({email: 'test@test.com'}));
    spyOn(router, 'navigate');
    service.logout();
    expect(localStorage.getItem('userData')).toBeNull();
  });

  it('should set a timer on autoLogout', () => {
    jasmine.clock().install();
    spyOn(router, 'navigate');
    service.autoLogout(1000);
    jasmine.clock().tick(1001);
    service.user.subscribe(user => {
      expect(user).toBeNull();
    });
    jasmine.clock().uninstall();
  });

  it('should not auto login if no userData in localStorage', () => {
    localStorage.removeItem('userData');
    service.autoLogin();
    service.user.subscribe(user => {
      expect(user).toBeNull();
    });
  });

  it('should auto login if valid userData exists in localStorage', () => {
    const futureDate = new Date(Date.now() + 3600000);
    const userData = {
      email: 'test@test.com',
      id: '123',
      _token: 'valid-token',
      _tokenExpirationDate: futureDate.toISOString()
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    service.autoLogin();
    service.user.subscribe(user => {
      expect(user).toBeTruthy();
      expect(user.email).toBe('test@test.com');
    });
  });

  it('should not auto login if token is expired', () => {
    const pastDate = new Date(Date.now() - 3600000);
    const userData = {
      email: 'test@test.com',
      id: '123',
      _token: 'expired-token',
      _tokenExpirationDate: pastDate.toISOString()
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    service.autoLogin();
    service.user.subscribe(user => {
      expect(user).toBeNull();
    });
  });
});
