import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { HomeComponent } from './home.component';
import { of } from 'rxjs';

const listBook: Book[] = [
  { name: 'nombre0', author: 'autor0', isbn: '000', price: 15, amount: 2 },
  { name: 'nombre1', author: 'autor1', isbn: '001', price: 20, amount: 1 },
  { name: 'nombre2', author: 'autor2', isbn: '002', price: 8, amount: 7 },
];

const bookServiceMock = {
  getBooks: () => of(listBook),
};

@Pipe({
  name: 'reduceText',
})
class ReducePipeMock implements PipeTransform {
  transform(): string {
    return '';
  }
}

describe('Home component', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent, ReducePipeMock],
      providers: [
        //BookService
        {
          provide: BookService,
          useValue: bookServiceMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(BookService);
  });

  afterEach(() => {
    fixture.destroy();
    jest.resetAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getBooks works correctly', () => {
    // const spy1 = jest
    //   .spyOn(service, 'getBooks')
    //   .mockReturnValueOnce(of(listBook));
    component.getBooks();
    //expect(spy1).toBeCalledTimes(1);
    expect(component.listBook.length).toBe(3);
    expect(component.listBook).toEqual(listBook);
  });
});
