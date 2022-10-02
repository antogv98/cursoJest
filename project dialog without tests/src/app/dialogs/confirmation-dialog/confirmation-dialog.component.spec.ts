import { ConfirmDialogComponent } from './confirmation-dialog.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const MatDialogRefMock={
  close:()=>null
};

describe('Config dialog component',()=>{
  let component:ConfirmDialogComponent;
  let fixture:ComponentFixture<ConfirmDialogComponent>;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports:[],
      declarations:[
        ConfirmDialogComponent
      ],
      providers:[
        // MatDialogRef,
        // MAT_DIALOG_DATA
        {
          provide:MatDialogRef,useValue:MatDialogRefMock
        },
        {
          provide:MAT_DIALOG_DATA,useValue:{}
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onConfirm send true value', () => {
    //const service = fixture.debugElement.injector.get(MatDialogRef);
    const service = TestBed.inject(MatDialogRef);
    const spy = jest.spyOn(service,'close');
    component.onConfirm();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('onDismiss send false value', () => {
    //const service = fixture.debugElement.injector.get(MatDialogRef);
    const service = TestBed.inject(MatDialogRef);
    const spy = jest.spyOn(service,'close');
    component.onDismiss();
    expect(spy).toHaveBeenCalledWith(false);
  });


});
