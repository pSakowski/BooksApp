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
}
