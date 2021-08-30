function findAuthorById(authors, id) {
  let foundAuthor = authors.find((author) => author.id == id);
  return foundAuthor;
}

function findBookById(books, id) {
  let foundBook = books.find((book) => book.id == id);
  return foundBook;
}

function partitionBooksByBorrowedStatus(books) {
  // declare the two arrays to be returned
  let returned = [];
  let notReturned = [];
  let partitionedBooks = [];
  // loop throught the array
  for (let i = 0; i < books.length; i++){
    let currentBook = books[i];
      if (currentBook.borrows.length != undefined){
      let currentBorrows = currentBook.borrows[0];
      if (currentBorrows.returned == false){
        notReturned.push(currentBook);
      }

      else {
        returned.push(currentBook);
      }
    }

    else {
      if (currentBook.borrows.returned == false){
        notReturned.push(currentBook);
      }
      else {
        returned.push(currentBook);
      }
    }
    

  }
  partitionedBooks = [notReturned, returned];
  return partitionedBooks;
}

function getBorrowersForBook(book, accounts) {
  const borrowers = book.borrows;
  let borrowersAccounts = [];

  for (let borrower in borrowers){
    let currentBorrower = borrowers[borrower];
    for (let account in accounts){
      let currentAccount = accounts[account];
      if ( currentBorrower.id == currentAccount.id && borrowersAccounts.length < 10){
        const mutatedAccount = {...currentAccount, 'returned': currentBorrower.returned};
        borrowersAccounts.push(mutatedAccount);
      }
    }
  }

  return borrowersAccounts;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
