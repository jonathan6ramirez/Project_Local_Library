function findAccountById(accounts, id) {
  const foundId = accounts.find((account) => account.id == id);
  return foundId;
}

function sortAccountsByLastName(accounts) {
  const sortedAccounts = accounts.sort((userA, userB) =>
  userA.name.last.toLowerCase() > userB.name.last.toLowerCase() ? 1 : -1 );
  return sortedAccounts;
}

function getTotalNumberOfBorrows(account, books) {
  // declare the variables
  const id = account.id;
  let filteredBooks = []

  for (let i = 0; i < books.length; i++){
    // create a holder for the current book
    const currentBook = books[i];
    // filter the books by the id
    let filterBooks = currentBook.borrows.filter((borrows) => borrows.id == id)
    // if the current filterBooks is empty skip it
    if (filterBooks == false){ }
    // if it contains an object push it
    else {filteredBooks.push(filterBooks)};
  }
  // return the amount of borrows
  return filteredBooks.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  // get the id of the account
  const id = account.id;
  let booksPossessed = [];
  // loop through the books
  for (let book in books){
    // set the current book to a variable for readability
    const currentBook = books[book];
    // loop through the borrows array
    for (let i = 0; i < currentBook.borrows.length; i++){
      // set the current borrows to a variable for readability
      const currentBorrows = currentBook.borrows[i];
      // check to see if the id matches and that its not returned
      if (currentBorrows.id == id && currentBorrows.returned == false){
        let foundAuthor = authors.find((author) => author.id == currentBook.authorId)
        currentBook.borrows = currentBorrows;
        let newAuthor = {'author': foundAuthor, 'borrows': currentBorrows};
        booksPossessed = [{...currentBook, ...newAuthor}];
      }
    }
  }
  return booksPossessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
