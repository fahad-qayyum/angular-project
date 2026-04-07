import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthService} from "../auth/auth.service";
import {DataStorageService} from "../shared/data-storage.service";
import {of} from "rxjs";
import {User} from "../auth/user.model";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let dataStorageService: DataStorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    dataStorageService = TestBed.get(DataStorageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isAuthenticated to false initially', () => {
    fixture.detectChanges();
    expect(component.isAuthenticated).toBe(false);
  });

  it('should set isAuthenticated to true when user is logged in', () => {
    const user = new User('test@test.com', '123', 'token', new Date(Date.now() + 3600000));
    authService.user.next(user);
    fixture.detectChanges();
    expect(component.isAuthenticated).toBe(true);
  });

  it('should call storeRecipes on onSaveData', () => {
    spyOn(dataStorageService, 'storeRecipes');
    component.onSaveData();
    expect(dataStorageService.storeRecipes).toHaveBeenCalled();
  });

  it('should call fetchRecipes on onFetchData', () => {
    spyOn(dataStorageService, 'fetchRecipes').and.returnValue(of([]));
    component.onFetchData();
    expect(dataStorageService.fetchRecipes).toHaveBeenCalled();
  });

  it('should call logout on onLogout', () => {
    spyOn(authService, 'logout');
    component.onLogout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should unsubscribe on destroy', () => {
    fixture.detectChanges();
    spyOn(component['userSub'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['userSub'].unsubscribe).toHaveBeenCalled();
  });
});
