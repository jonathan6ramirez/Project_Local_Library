// Function to get the length of the array
const getLength = (array) => {
  return array.length;
};

function getTotalBooksCount(books) {
  return getLength(books);
}

function getTotalAccountsCount(accounts) {
  return getLength(accounts);
}

function getBooksBorrowedCount(books) {

  let numberOfBorrowedBooks = books.reduce(function(sum, book) {
    if (book.borrows.length != undefined){
      return (book.borrows[0].returned == false) ? sum + 1 : sum;
    } else if (book.borrows.length == undefined) {
      return (book.borrows.returned == false) ? sum + 1 : sum ;
    }
  }, 0)
  
  return numberOfBorrowedBooks;
}

function getMostCommonGenres(books) {

  let genresCounted = [];

  //seperate the genres into a seperate array
  let genres = books.map((book) => book.genre)


  //sort the genres
  let sortedGenres = genres.sort((a, b) => a > b ? 1:-1)
  //console.log(sortedGenres);
  for (let i = 0; i < sortedGenres.length; i++){
    const currentGenre = sortedGenres[i];
    let found = genresCounted.find((genre) => genre.name ==currentGenre);
    if (found){
      found.count++;
    }
    else {
      let newGenre = {"name": currentGenre,"count": 1};
      genresCounted.push(newGenre);
    }
  }
  genresCounted.sort((a,b) => a.count < b.count ? 1:-1);

  genresCounted = genresCounted.slice(0,5);
  return genresCounted;
}

function getMostPopularBooks(books) {
  // sort the book by the borrows
  books.sort((bookA, bookB) => (bookA.borrows < bookB.borrows ? 1 : -1));
  // delcare the array to be returned
  let mostCommonBook = []
  // add the top 5 books
  for (let i = 0; i < 5; i++){
    // keep track of the curent book and count or times borrowed
    let currentBook = books[i];
    const currentCount = currentBook.borrows.length; 
    mostCommonBook.push({name: currentBook.title, count: currentCount});
  }
  // return the array
  return mostCommonBook;
}

function getMostPopularAuthors(books, authors) {

  let unsortedAuthors = [];
  // loop through the array of books
  for (let i = 0; i < books.length; i++){
    let currentBook = books[i];
    for (let j = 0; j < authors.length; j++){
      let currentAuthor = authors[j];
      if (currentAuthor.id == currentBook.authorId){
        let name = currentAuthor.name.first + " " +  currentAuthor.name.last;
        unsortedAuthors.push({'name': name, "count": currentBook.borrows.length})
      }

    }
  }
  for (let i = 0; i< unsortedAuthors.length; i++){
    if (unsortedAuthors[i].count == undefined){
      unsortedAuthors[i].count = 0;
    }
  }

  let sortedAuthors = unsortedAuthors.sort((authorA, authorB) => 
  authorA.count < authorB.count ? 1 : -1)
  sortedAuthors.length = 5;
  return sortedAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
