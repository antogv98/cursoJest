import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from 'src/app/models/book.model';

const listBook: Book[] = [
  { name: 'nombre0', author: 'autor0', isbn: '000', price: 15, amount: 2 },
  { name: 'nombre1', author: 'autor1', isbn: '001', price: 20, amount: 1 },
  { name: 'nombre2', author: 'autor2', isbn: '002', price: 8, amount: 7 },
];

describe('Cart component', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        CartComponent
      ],
      providers: [
        BookService,
       // CartComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(BookService);
    jest.spyOn(service, 'getBooksFromCart').mockImplementation(() => listBook);
  });

  afterEach(() => {
    fixture.destroy();
    jest.resetAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should create', inject([CartComponent],(component2:CartComponent)=>{
  //   expect(component2).toBeTruthy();
  // }));

  it('getTotalPrice returns an amount', () => {
    const totalPrice = component.getTotalPrice(listBook);
    expect(totalPrice).toBeGreaterThan(0);
    // expect(totalPrice).not.toBe(0);
    // expect(totalPrice).not.toBe(null);
  });

  // public onInputNumberChange(action: string, book: Book): void {
  //   const amount = action === 'plus' ? book.amount + 1 : book.amount - 1;
  //   book.amount = Number(amount);
  //   this.listCartBook = this._bookService.updateAmountBook(book);
  //   this.totalPrice = this.getTotalPrice(this.listCartBook);
  // }

  it('onInputNumberChange increments correctly', () => {
    const action = 'plus';
    const book: Book = listBook[0];
    //MAL
    //const service = (component as any)._bookService;
    //MAL PERO MENOS
    //const service = component["_bookService"];
    //BIEN
    //const service = fixture.debugElement.injector.get(BookService);
    const spy1 = jest
      .spyOn(service, 'updateAmountBook')
      .mockImplementation(() => null);
    const spy2 = jest
      .spyOn(component, 'getTotalPrice')
      .mockImplementation(() => null);

    expect(book.amount).toBe(2);

    component.onInputNumberChange(action, book);

    //expect(book.amount).toBe(3);
    expect(book.amount === 3).toBe(true);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it('onInputNumberChange decrements correctly', () => {
    const action = 'minus';
    const book: Book = listBook[0];
    const spy1 = jest
      .spyOn(service, 'updateAmountBook')
      .mockImplementation(() => null);
    const spy2 = jest
      .spyOn(component, 'getTotalPrice')
      .mockImplementation(() => null);

    expect(book.amount).toBe(3);

    component.onInputNumberChange(action, book);

    expect(book.amount).toBe(2);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  // public onClearBooks(): void {
  //   if (this.listCartBook && this.listCartBook.length > 0) {
  //     this._clearListCartBook();
  //   } else {
  //      console.log("No books available");
  //   }
  // }

  // private _clearListCartBook() {
  //   this.listCartBook = [];
  //   this._bookService.removeBooksFromCart();
  // }

  it('onClearBooks works correctly', () => {
    const spy1 = jest
      .spyOn(service, 'removeBooksFromCart')
      .mockImplementation(() => null);
    const spy2 = jest.spyOn(component as any, '_clearListCartBook');

    component.listCartBook = listBook;
    component.onClearBooks();

    expect(component.listCartBook.length).toBe(0);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });
  it('onClearBooks works correctly no books', () => {
    const logSpy = jest.spyOn(console, 'log');

    component.listCartBook = [];
    component.onClearBooks();

    expect(logSpy).toHaveBeenCalledWith('No books available');
  });

  it('_clearListCartBook works correctly', () => {
    const spy1 = jest
      .spyOn(service, 'removeBooksFromCart')
      .mockImplementation(() => null);

    component.listCartBook = listBook;
    component['_clearListCartBook']();

    expect(component.listCartBook.length).toBe(0);
    expect(spy1).toHaveBeenCalledTimes(1);
  });
});
