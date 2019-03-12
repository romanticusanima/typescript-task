import { Category } from './enums';
import { Book, Logger, Author, Librarian, Magazine } from './interfaces';
import { UniversityLibrarian, Shelf } from './classes';
import RefBook from './classes/encyclopedia';
import Encyclopedia from './classes/encyclopedia';
import { 
  purge, 
  getAllBooks, 
  logFirstAvailable, 
  logBookTitles, 
  getBookTitlesByCategory, 
  getBookById, 
  createCustomerID, 
  createCustomer, 
  checkoutBooks, 
  getTitles, 
  printBook,
  getBooksByCategory,
  logCategorySearch
} from './lib/utility-function';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = `Hello from ${name}`;
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

console.log('*** Task 18 ***');
let inventory: Array<Book> = [
  { 
    id: 10, 
    title: 'The C Programming Language', 
    author: 'K & R', 
    available: true, 
    category: Category.Software 
  },
  { 
    id: 11, 
    title: 'Code Complete', 
    author: 'Steve McConnell', 
    available: true, 
    category: Category.Software 
  },
  { 
    id: 12, 
    title: '8-Bit Graphics with Cobol', 
    author: 'A. B.', 
    available: true, 
    category: Category.Software 
  },
  { 
    id: 13, 
    title: 'Cool autoexec.bat Scripts!', 
    author: 'C. D.', 
    available: true, 
    category: Category.Software 
  }
]

const books = purge<Book>(inventory);
console.log(books);
console.log(purge<number>([1,2,3,4,5]));

console.log('*** Task 19 ***');
const bookShelf: Shelf<Book> = new Shelf<Book>();
inventory.forEach(book => bookShelf.add(book));
const firstBook: Book = bookShelf.getFirst();
console.log(firstBook);

const magazines: Array<Magazine> = [
  { title: 'Programming Language Monthly', publisher: 'Code Mags' },
  { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
  { title: 'Five Points', publisher: 'GSU' }
];
const magazineShelf: Shelf<Magazine> = new Shelf<Magazine>();
magazines.forEach(magazine => magazineShelf.add(magazine));
const firstMagazine: Magazine = magazineShelf.getFirst();
console.log(firstMagazine);
magazineShelf.printTitles();
console.log(magazineShelf.find('Five Points'));

console.log('*** Task 22 ***');
let fLibrarian: Librarian = new UniversityLibrarian();
fLibrarian.name = 'Anna';
fLibrarian['printLibrarian']();

console.log('*** Task 23 ***');
let lib = new UniversityLibrarian();
lib.assistFaculty = () => console.log('Hello');
lib.assistFaculty();
//lib.teachCommunity = () => console.log('World');

console.log('*** Task 24 ***');
const enc = new Encyclopedia('Title', 2019, 8);
enc.printItem();

console.log('*** Task 25 ***');
const lib2 = new UniversityLibrarian();
lib2.name = 'Anna';
lib2.assistCustomer('Boris');

console.log('*** Task 26 ***');
const lib3 = new UniversityLibrarian();
lib3.name = 'Kate';
console.log(lib3.name);

console.log('*** Task 27 ***');
let ency = new Encyclopedia('Title', 2019, 8);
ency.copies = 10;

console.log('*** Task 28 ***');
console.log('Beggining search...');
getBooksByCategory(Category.JavaScript, logCategorySearch);
getBooksByCategory(Category.Software, logCategorySearch);
console.log('Search is completed');

console.log('*** Task 29 ***');


console.log('*** Task 30 ***');

