
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  bookForm: FormGroup;
  authorName: string = '';
  authorBirthday: string = '';
  authorBirthPlace: string = '';
  datePublished: string = '';
  saveIndex: number = 123
  sortFlag: boolean = true;
  sortByDateFlag: boolean = true;

  constructor(
    private bookService: BookService,
    private fb: FormBuilder
  ) {
    this.bookForm = this.fb.group({
      imageUrl: ['', Validators.required],
      title: ['', Validators.required],
      purchaseLink: ['', Validators.required],
      datePublished: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getBookList();

  }
  getBookList(): void {
    this.bookService.getBooks().subscribe((data: any) => {
      this.books = data.data.books;
      this.authorName = data.data.author;
      this.authorBirthday = data.data.birthday;
      this.authorBirthPlace = data.data.birthPlace;
      this.datePublished = data.data.PublishDate;
    });
  }

  sortByTitle(): void {
    this.sortFlag ? this.books.sort((a, b) => a.title.localeCompare(b.title)) : this.getBookList();
    this.sortFlag = !this.sortFlag
  }

  sortByDate(): void {
    if (this.sortByDateFlag) {
      this.books.sort((a, b) => {
        const nameA = Number(a.PublishDate);
        const nameB = Number(b.PublishDate);
        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.getBookList();
    }
    this.sortByDateFlag = !this.sortByDateFlag
  }

  addBook(): void {
    if (this.bookForm.valid) {
      this.books.push(this.bookForm.value);
      this.resetForm();
    }
  }

  deleteBook(index: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.books.splice(index, 1);
    }
  }

  editBook(index: number): void {
    this.saveIndex = index;
    const editedBook = this.bookForm.value;
    if (this.bookForm.valid) {
      this.books[index] = editedBook;
      this.resetForm();
    }
  }
  // Reset the form
  resetForm(): void {
    this.bookForm.reset();
  }
}
