{
  ('use strict');

  const select = {
    templateOf: {
      bookProduct: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
  };
  
  const templates = {
    menuBook: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
  };

  const render = function () {
    for (const book of dataSource.books) {

      /* generateHTML based on template */
      const generatedHTML = templates.menuBook(book);

      /* create element using utils.createElementFromHtml */
      const domElement = utils.createDOMFromHTML(generatedHTML);

      /* find books list */
      const bookContainer = document.querySelector('.books-list');

      /* add element to books list */
      bookContainer.appendChild(domElement);
    }
  };
  render();

  const favoriteBooks = [];

  function initActions() {
    const bookList = document.querySelectorAll('.books-list .book__image');

    for (let book of bookList) {

      // addEventListener to bookList
      book.addEventListener('dblclick', function(event) {
        event.preventDefault();

        // get book attribute from data-id
        const dataId = book.getAttribute('data-id');

        // remove book from favoriteBook
        if(book.getAttribute('class').includes('favorite')) {
          book.classList.remove('favorite');
          
          const index = favoriteBooks.indexOf(dataId);
          favoriteBooks.splice(index, 1);
        } else if (!book.getAttribute('class').includes('favorite')) {
          book.classList.add('favorite');

          // add book to favoriteBooks
          favoriteBooks.push(dataId);
        }
      });
    }
  }
  initActions();
}
