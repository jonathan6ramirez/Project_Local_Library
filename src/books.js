const find = (array, id) => {
  return array.find((index)=> index.id == id );
}

function findAuthorById(authors, id) {
  return find(authors,id);
}

function findBookById(books, id) {
  return find(books,id);
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
