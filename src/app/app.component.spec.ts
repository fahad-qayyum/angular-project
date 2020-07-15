import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "./auth/auth.service";

fdescribe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'project'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('project');
  });

  it('should call the autoLogin on the ngOnInit', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    let authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'autoLogin');
    fixture.detectChanges();
    expect(authService.autoLogin).toHaveBeenCalled();
  }))

  it('should have the header component', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-header')).not.toBe(null);
  }))
});
