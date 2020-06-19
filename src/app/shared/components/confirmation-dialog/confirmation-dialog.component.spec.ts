import {ConfirmationDialogComponent} from './confirmation-dialog.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {DefaultConfirmationWindowMessage} from '../../models/confirmation-dialog.model';
import {MOCKED_CONFIRMATION_DIALOG_DATA} from '../../mocks/confirmationDialog.mocks';

describe('ConfirmationDialogComponent', () => {
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let component: ConfirmationDialogComponent;
  let mockedMatDialogRef: jasmine.SpyObj<MatDialogRef<ConfirmationDialogComponent>>;

  const configureTestingModule: (withData?: boolean) => void = (withData: boolean = false) => {
    mockedMatDialogRef = jasmine.createSpyObj(MatDialogRef, ['close']);
    mockedMatDialogRef.close.and.returnValue(null);

    TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
      imports: [
        MatDialogModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockedMatDialogRef
        },
        {provide: MAT_DIALOG_DATA, useValue: withData ? MOCKED_CONFIRMATION_DIALOG_DATA : null},
      ],
    }).compileComponents();

  };

  const initializeTestComponent: () => void = (): void => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  };

  describe('OnInit', () => {
    describe('with data provided', () => {
      beforeEach(async(() => {
        configureTestingModule(true);
      }));

      beforeEach(async(() => {
        initializeTestComponent();
      }));

      it('should set up the default data', () => {
        expect(component.data).toBe(MOCKED_CONFIRMATION_DIALOG_DATA);
      });
    });

    describe('with no data provided', () => {
      beforeEach(async(() => {
        configureTestingModule();
      }));

      beforeEach(async(() => {
        initializeTestComponent();
      }));

      it('should set up the default data', () => {
        expect(component.data).toBe(DefaultConfirmationWindowMessage);
      });
    });
  });

  describe('onConfirm', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    beforeEach(async(() => {
      initializeTestComponent();
    }));

    it('should call the close method with a confirmed flag', () => {
      component.onConfirm();

      expect(mockedMatDialogRef.close).toHaveBeenCalledTimes(1);
      expect(mockedMatDialogRef.close).toHaveBeenCalledWith({confirmed: true});
    });
  });
});
