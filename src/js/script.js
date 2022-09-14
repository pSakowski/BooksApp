/*
{
  ('use strict');

  const select = {
    templateOf: {
      bookProduct: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
    images: {
      bookImage: 'book_image',
    },
    watchFilters: '.filters',
  };
  
  const templates = {
    menuBook: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
  };

  const render = function () {
    for (const book of dataSource.books) {

      book.ratingBgc = determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;
      // generateHTML based on template
      const generatedHTML = templates.menuBook(book);

      // create element using utils.createElementFromHtml
      const domElement = utils.createDOMFromHTML(generatedHTML);

      // find books list
      const bookContainer = document.querySelector('.books-list');

      // add element to books list
      bookContainer.appendChild(domElement);
    }
  };

  const favoriteBooks = [];

  function initActions() {
    const bookList = document.querySelector('.books-list');

    bookList.addEventListener('dblclick', function(event) {
      event.preventDefault();
      const clicked = event.target;

      if(clicked.offsetParent.classList.contains('book__image')) {
        const dataId = clicked.offsetParent.getAttribute('data-id');
        if(!favoriteBooks.dataId && !clicked.offsetParent.classList.contains('favorite')) {
          favoriteBooks.push(dataId);
          clicked.offsetParent.classList.add('favorite');
        } else {
          const index = favoriteBooks.indexOf(dataId);
          favoriteBooks.splice(index, 1);
          clicked.offsetParent.classList.remove('favorite');
        } 
      }
    });

    watchFilters.addEventListener('click', function (event) {
      if (
        event.target.tagName == 'INPUT' &&
          event.target.type == 'checkbox' &&
          event.target.name == 'filter'
      ) {
        if (event.target.checked) {
          filters.push(event.target.value);
        } else {
          filters.splice(filters.indexOf(event.target.value), 1);
        }
      }
      filterBooks();
      const inputs = document.querySelectorAll('.filters input');
      for (let input of inputs) {
        input.addEventListener('change', filterBooks);
      }
    });
  }

  const filters = [];

  const watchFilters = document.querySelector('.filters');

  const filterBooks = function () {
    for (const book of dataSource.books) {
      let shouldBeHidden = false;
      for (const filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden) {
        document.querySelector(`[data-id="${book.id}"]`).classList.add('hidden');
      } else {
        document.querySelector(`[data-id="${book.id}"]`).classList.remove('hidden');
      }
    }
  };

  const determineRatingBgc = function (rating) {
    
    let ratingBgc = '';

    if (rating < 6) {
      ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%';
    } else if (rating > 6 && rating <= 8) {
      ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%';
    } else if (rating > 8 && rating <= 9) {
      ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%';
    } else if (rating > 9) {
      ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%';
    }
    return ratingBgc;
  };

  render();
  initActions();
  determineRatingBgc();
}
*/

const select = {
  templateOf: {
    bookProduct: '#template-book',
  },
  containerOf: {
    bookList: '.books-list',
  },
  images: {
    bookImage: 'book_image',
  },
  filters: '.filters',
};

const templates = {
  menuBook: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
};

const favoriteBooks = [];
const filters = [];

class BooksList {
  constructor(id) {
    const thisBook = this;
    thisBook.id = id;

    thisBook.initData();
    thisBook.getElements();
    thisBook.initActions();
    thisBook.filterBooks();
    thisBook.determineRatingBgc();
  }

  initData() {
    this.data = dataSource.books;
    const thisBook = this;

    for(let book of this.data) {

      book.ratingBgc = thisBook.determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;

      // generateHTML based on template
      const generatedHTML = templates.menuBook(book);

      // create element using utils.createElementFromHtml
      thisBook.bookParams = utils.createDOMFromHTML(generatedHTML);

      // find books list
      const bookContainer = document.querySelector(select.containerOf.bookList);

      // add element to books list
      bookContainer.appendChild(thisBook.bookParams);
    }
  }

  getElements() {
    const thisBook = this;

    thisBook.container = document.querySelector(select.containerOf.bookList);
    thisBook.bookImage = thisBook.container.querySelectorAll(select.images.bookImage);
    thisBook.filter = document.querySelector(select.filters);
  }

  initActions() {
    const thisBook = this;

    thisBook.container.addEventListener('dblclick', function(event) {
      event.preventDefault();
      const clicked = event.target;

      if(clicked.offsetParent.classList.contains('book__image')) {
        const dataId = clicked.offsetParent.getAttribute('data-id');
        if(!favoriteBooks.dataId && !clicked.offsetParent.classList.contains('favorite')) {
          favoriteBooks.push(dataId);
          clicked.offsetParent.classList.add('favorite');
        } else {
          const index = favoriteBooks.indexOf(dataId);
          favoriteBooks.splice(index, 1);
          clicked.offsetParent.classList.remove('favorite');
        } 
      }
    });

    thisBook.filter.addEventListener('click', function (event) {
      if (
        event.target.tagName == 'INPUT' &&
          event.target.type == 'checkbox' &&
          event.target.name == 'filter'
      ) {
        if (event.target.checked) {
          filters.push(event.target.value);
        } else {
          filters.splice(filters.indexOf(event.target.value), 1);
        }
        console.log(event.target.value);
      }
      thisBook.filterBooks();
    });
  }

  filterBooks () {
    for (const book of dataSource.books) {
      let shouldBeHidden = false;
      for (const filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden) {
        document.querySelector(`[data-id="${book.id}"]`).classList.add('hidden');
      } else {
        document.querySelector(`[data-id="${book.id}"]`).classList.remove('hidden');
      }
    }
  }

  determineRatingBgc(rating) {
    let ratingBgc = '';

    if (rating < 6) {
      ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%';
    } else if (rating > 6 && rating <= 8) {
      ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%';
    } else if (rating > 8 && rating <= 9) {
      ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%';
    } else if (rating > 9) {
      ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%';
    }
    return ratingBgc;
  }
}

const app = new BooksList();
console.log(app);