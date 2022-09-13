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
  }
  initActions();
}
