import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { BookService } from './book.service';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment.prod';
import swal from 'sweetalert2';

const listBook: Book[] = [
  { name: 'nombre0', author: 'autor0', isbn: '000', price: 15, amount: 2 },
  { name: 'nombre1', author: 'autor1', isbn: '001', price: 20, amount: 1 },
  { name: 'nombre2', author: 'autor2', isbn: '002', price: 8, amount: 7 },
];

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('getBooks return a list of book and does a get method', () => {
    service.getBooks().subscribe((resp: Book[]) => {
      expect(resp).toEqual(listBook);
    });
    const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
    expect(req.request.method).toBe('GET');
    req.flush(listBook);
  });

  it('getBooksFromCart return an empty array when local storage empty', () => {
    const listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
  });

  it('getBooksFromCart return an array of books', () => {
    localStorage.setItem('listCartBook', JSON.stringify(listBook));
    const newlistBook = service.getBooksFromCart();
    expect(newlistBook.length).toBe(3);
  });

  it('removeBooksFromCart set listCartBook in localStorage to null', () => {
    localStorage.setItem('listCartBook', JSON.stringify(listBook));
    const beforelistBook = service.getBooksFromCart();
    service.removeBooksFromCart();
    const afterlistBook = service.getBooksFromCart();
    expect(beforelistBook.length).toBe(3);
    expect(afterlistBook.length).toBe(0);
  });


  it('addBookToCart create list in local storage an add book', () => {
    const toastMock={
      fire:()=>null
    } as any;
    const spy1 = jest.spyOn(swal,"mixin").mockImplementation(()=>{
      return toastMock;
    });
    const beforelistBook = service.getBooksFromCart();
    service.addBookToCart(listBook[0]);
    const afterlistBook = service.getBooksFromCart();
    expect(spy1).toHaveBeenCalledTimes(1)
    expect(beforelistBook.length).toBe(0);
    expect(afterlistBook.length).toBe(1);
  });

  it('addBookToCart add new book in created localStorage list', () => {
    const toastMock={
      fire:()=>null
    } as any;
    const spy1 = jest.spyOn(swal,"mixin").mockImplementation(()=>{
      return toastMock;
    });
    const beforebeforelistBook = service.getBooksFromCart();
    service.addBookToCart(listBook[0]);
    const beforelistBook = service.getBooksFromCart();
    service.addBookToCart(listBook[1]);
    const afterlistBook = service.getBooksFromCart();

    expect(spy1).toHaveBeenCalledTimes(2)
    expect(beforebeforelistBook.length).toBe(0);
    expect(beforelistBook.length).toBe(1);
    expect(afterlistBook.length).toBe(2);
  });

  it('addBookToCart add amount of book in created localStorage list', () => {
    const toastMock={
      fire:()=>null
    } as any;
    const spy1 = jest.spyOn(swal,"mixin").mockImplementation(()=>{
      return toastMock;
    });
    const beforebeforelistBook = service.getBooksFromCart();
    service.addBookToCart(listBook[0]);
    const beforelistBook = service.getBooksFromCart();
    service.addBookToCart(listBook[0]);
    const afterlistBook = service.getBooksFromCart();

    expect(spy1).toHaveBeenCalledTimes(2)
    expect(beforebeforelistBook.length).toBe(0);
    expect(beforelistBook.length).toBe(1);
    expect(afterlistBook.length).toBe(1);
    expect(beforelistBook[0].amount).toBe(listBook[0].amount);
    expect(afterlistBook[0].amount).toBe(listBook[0].amount+1);
  });

  it('updateAmountBook in not created or not in localStorage list', () => {
    const spy1 =jest.spyOn(service, 'getBooksFromCart').mockImplementation(() => []);
    const beforelistBook = service.getBooksFromCart();
    expect(beforelistBook.length).toBe(0);
    const afterlistBook = service.updateAmountBook(listBook[0]);
    expect(spy1).toHaveBeenCalledTimes(2)
    expect(beforelistBook.length).toBe(0);
    expect(afterlistBook.length).toBe(0);
  });

  it('updateAmountBook if book is in localStorage list', () => {
    const toastMock={
      fire:()=>null
    } as any;
    const spy1 = jest.spyOn(swal,"mixin").mockImplementation(()=>{
      return toastMock;
    });
    const spy2 =jest.spyOn(service, 'getBooksFromCart').mockImplementation(() => []);
    service.addBookToCart(listBook[0]);
    listBook[0].amount=4;
    const afterlistBook = service.updateAmountBook(listBook[0]);
    expect(spy1).toHaveBeenCalledTimes(1)
    expect(spy2).toHaveBeenCalledTimes(1)
    expect(afterlistBook.length).toBe(0);
  });


});
