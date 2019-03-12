import { Book, LibMgrCallback } from "../interfaces";
import { Category } from "../enums";

export function purge<T>(inventory: Array<T>): Array<T> {
    return inventory.splice(2, inventory.length);
}

export function getAllBooks(): Book[] {
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
  
export function logFirstAvailable(books: any[] = getAllBooks()): void {
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
  
export function getBookTitlesByCategory(category: Category = Category.JavaScript): Array<string> {
    const allBooks = getAllBooks() as any[];
    const titles: Array<string> = [];
  
    for(const book of allBooks) {
      if(book.category === category) {
        titles.push(book.title);
      }
    }
  
    return titles;
}
  
export function logBookTitles(titles: string[]): void {
    for(const title of titles) {
      console.log(title);
    }
}
  
export function getBookById(id: number): Book | undefined {
    const allBooks = getAllBooks();
    return allBooks.find(book => (book as any).id === id);
}
  
export function createCustomerID(name: string, id: number): string {
    return `${name} ${id}`;
}
  
export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Create customer name: ${name}`);
    if (age) {
      console.log(`Create customer age: ${age}`);
    }
    if (city) {
      console.log(`Create customer city: ${city}`);
    }
}
  
export function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
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
  
export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(bookProperty: string | boolean): string[] {
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
  
export function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

export function getBooksByCategory(categoty: Category, callback: LibMgrCallback): void {
   setTimeout(() => {
       try {
            const titles: string[] = getBookTitlesByCategory(categoty);

            if (titles.length > 0) {
                callback(null, titles);
            } else {
                throw new Error('No books found');
            }
       } 
       catch (error) {
           callback(error, null);
       }
   }, 2000); 
}

export function logCategorySearch(err: Error, titles: string[]): void {
    if (err) {
        console.log(`Error: ${err.message}`)
    } else {
        console.log(titles);
    }
}