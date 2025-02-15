import axios from 'axios';

export class FetchBooks {
  API_URL = 'https://books-backend.p.goit.global/books/';
  constructor() {
    this.bookId = 0;
    this.category = '';
  }

  fetchCategoryList() {
    return axios
      .get(`${this.API_URL}/category-list`)
      .then(response => response)
      .catch(console.error);
  }

  fetchTopBooks() {
    return axios
      .get(`${this.API_URL}/top-books`)
      .then(response => response)
      .catch(console.error);
  }

  fetchBookId() {
    return axios
      .get(`${this.API_URL}${this.bookId}`)
      .then(response => response)
      .catch(console.error);
  }

  fetchCategoryOfBooks() {
    return axios
      .get(`${this.API_URL}category?category=${this.category}`)
      .then(response => response)
      .catch(error => console.error(error));
  }
}