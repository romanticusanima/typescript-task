import { Category } from './enums';
import { Book, Logger, Author, Librarian } from './interfaces';
import { ReferenceItem, UniversityLibrarian} from './classes'
import RefBook from './classes/encyclopedia'

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = `Hello from ${name}`;
}

function getAllBooks(): Book[] {
  let books: Book[] = [
    {
      id: 1,
      title: 'Refactoring JavaScript',
      author: 'Evan Burchard',
      available: true,
      category: Category.JavaScript
    },
    {
      id: 2,
      title: 'JavaScript Testing',
      author: 'Liang Yuxian Eugene',
      available: false,
      category: Category.JavaScript
    },
    {
      id: 3,
      title: 'CSS Secrets',
      author: 'Lea Verou',
      available: true,
      category: Category.CSS
    },
    {
      id: 4,
      title: 'Mastering JavaScript Object-Oriented Programming',
      author: 'Andrea Chiarelli',
      available: true,
      category: Category.JavaScript
    }
  ];

  return books;
}

function logFirstAvailable(books: any[] = getAllBooks()): void {
  const numberOfBooks: number = books.length;
  let firstAvailableTitle: string = '';

  for(const book of books) {
    if (book.available) {
      firstAvailableTitle = book.title;
      break;
    }
  }

  console.log(`number of books: ${numberOfBooks}`);
  console.log(`first available book: ${firstAvailableTitle}`);
}

function getBookTitlesByCategory(category: Category = Category.JavaScript): Array<string> {
  const allBooks = getAllBooks() as any[];
  const titles: Array<string> = [];

  for(const book of allBooks) {
    if(book.category === category) {
      titles.push(book.title);
    }
  }

  return titles;
}

function logBookTitles(titles: string[]): void {
  for(const title of titles) {
    console.log(title);
  }
}

function getBookById(id: number): Book | undefined {
  const allBooks = getAllBooks();
  return allBooks.find(book => (book as any).id === id);
}

function createCustomerID(name: string, id: number): string {
  return `${name} ${id}`;
}

function createCustomer(name: string, age?: number, city?: string): void {
  console.log(`Create customer name: ${name}`);
  if (age) {
    console.log(`Create customer age: ${age}`);
  }
  if (city) {
    console.log(`Create customer city: ${city}`);
  }
}

function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
  console.log(`checking out books for ${customer}`);

  const titles: string[] = [];

  for (const id of bookIDs) {
    const book = getBookById(id);
    if (book && book.available) {
      titles.push(book.title);
    }
  }

  return titles;
}

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(bookProperty: string | boolean): string[] {
  const allBooks: any[] = getAllBooks();
  let titles: string[] = [];

  if(typeof bookProperty === 'string') {
    titles = allBooks
        .filter(book => book.author === bookProperty)
        .map(book => book.title);
  } else if (typeof bookProperty === 'boolean') {
    titles = allBooks
        .filter(book => book.available === bookProperty)
        .map(book => book.title);
  }

  return titles;
}

function printBook(book: Book): void {
  console.log(`${book.title} by ${book.author}`);
}


console.log('*** Task 01 ***');
const allBooks = getAllBooks();
logFirstAvailable(allBooks);

console.log('*** Task 02 *** enum');
logBookTitles(getBookTitlesByCategory(Category.JavaScript));

console.log('*** Task 03 *** arrow functions');
const javaScriptBooksTitles = getBookTitlesByCategory(Category.JavaScript);
javaScriptBooksTitles.forEach((title: string) => console.log(title));

const book = getBookById(3);
console.log(book);

console.log('*** Task 04 *** function type');
let myID: string = createCustomerID('Ann', 10);
console.log(myID);

let idGenerator: (name: string, id: number) => string;
idGenerator = (name: string, id: number) => `${name} ${id}`;
idGenerator = createCustomerID;
myID = idGenerator('Ann', 20);
console.log(myID);

console.log('*** Task 05 *** optional, default, ...rest parameters');
createCustomer('Nastya');
createCustomer('Kate', 29);
createCustomer('Maria', 32, 'Kiev');

console.log(getBookTitlesByCategory());
console.log(getBookTitlesByCategory(undefined)); // the same

console.log(logFirstAvailable());

const myBooks = checkoutBooks('Ann', 1,2,4);
myBooks.forEach(book => console.log(book));
//console.log(myBooks);

console.log('*** Task 06 *** function overloading');
const checkedOutBooks = getTitles(false);
checkedOutBooks.forEach(title => console.log(title));

console.log('*** Task 07 *** interface');
const myBook: Book = {
  id: 5,
  title: 'Colors, Backgrounds, and Gradients',
  author: 'Eric A. Meyer',
  available: true,
  category: Category.CSS,
  pages: 200,
  markDamaged: (reason: string) => console.log(`Damaged: ${reason}`)
};

printBook(myBook);
myBook.markDamaged('missing back cover');

console.log('*** Task 08 *** interface for function types');
let logDamage: Logger;
logDamage = (reason: string) => console.log(`Damage: ${reason}`);
logDamage('coffee stains');

console.log('*** Task 09 *** extending interfaces');
const favoriteAuthor: Author = {
  name: 'Mike',
  email: 'mike@gmail.com',
  numBooksPublished: 5
};

// const favoriteLibrarian: Librarian = {
//   name: 'Olga',
//   email: 'olga@gmail.com',
//   department: 'Fantasy',
//   assistCustomer: (name: string) => console.log(`Assist ${name}`)
// };

console.log('*** Task 10 *** interfaces for class types');
const favoriteLibrarian: Librarian = new UniversityLibrarian();
console.log(favoriteLibrarian);
favoriteLibrarian.name = 'Nastya';
favoriteLibrarian.assistCustomer('Max');

// console.log('*** Task 11 *** classes creation');
// const ref: ReferenceItem = new ReferenceItem('Facts', 2019);
// ref.printItem();
// ref.publisher = 'test publisher';
// console.log(ref.publisher);

console.log('*** Task 12 *** extending class');
const refBook: RefBook = new RefBook('Encyclopedia', 2019, 10);
console.log(refBook);
refBook.printItem();

console.log('*** Task 13 *** abstract class');
refBook.printCitation();

console.log('*** Task 14 *** abstract class');