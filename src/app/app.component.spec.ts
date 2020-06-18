import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NavigationStart, Router} from '@angular/router';
import {of} from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let mockedRouter: Partial<Router>;
  let mockedNavigationStartEvent: NavigationStart;

  const configureTestingModule: (url?: string) => void = (url: string = '') => {
    mockedNavigationStartEvent = new NavigationStart(0, url);

    mockedRouter = {
      events: of(mockedNavigationStartEvent),
    };

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [],
      providers: [
        {provide: Router, useValue: mockedRouter},
      ],
    }).compileComponents();
  };

  const initializeTestComponent: () => void = (): void => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  };

  describe('OnInit', () => {
    describe('when the route is a locked one', () => {
      beforeEach(async(() => {
        configureTestingModule('/users');
      }));

      beforeEach(() => {
        initializeTestComponent();
      });

      it('should set the layout for authenticated pages', () => {
        expect(component.loadMembersLayout).toBe(true);
      });
    });

    describe('when the route is a public route', () => {
      beforeEach(async(() => {
        configureTestingModule('/auth');
      }));

      beforeEach(() => {
        initializeTestComponent();
      });

      it('should set the layout for no-auth pages', () => {
        expect(component.loadMembersLayout).toBe(false);
      });
    });
  });

  describe('ToggleDrawer', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    beforeEach(() => {
      initializeTestComponent();
    });

    it('should open the drawer if it was closed', () => {
      component.drawerOpened = true;
      fixture.detectChanges();

      component.toggleDrawer();
      expect(component.drawerOpened).toBe(false);
    });
  });


});
