import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../Services/book.service';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { Book } from '../Book';
import { AuthorService } from '../../Services/author.service';
import { CartServiceService } from '../../Services/cart-service.service';

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.css'
})
export class AllBooksComponent implements OnInit{

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private authorService: AuthorService,
    private cartService: CartServiceService,
    private router: Router
  ) 
  {

  }
  ngOnInit(): void {

    this.getBooks();
    this.getSerbianBooks();
    this.getForeignBooks();
    this.ActionBooks();
    this.AdventureBooks();
    this.BiographyBooks();
    this.ChildrensBooks();
    this.ClassicsBooks();
    this.CrimeBooks();
    this.DramaBooks();
    this.FantasyBooks();
    this.HistoryBooks();
    this.HorrorBooks();
    this.HumourBooks();
    this.MangaBooks();
    this.ParanormalBooks();
    this.PhilosophyBooks();
    this.PsychologyBooks();
    this.ReligionBooks();
    this.ScienceBooks();
    this.SciFiBooks();
    this.nameDescending();
    this.nameAscending();
    
    this.userService.getUserRoles().subscribe(
      response=> {
        this.userCredentials = response
        console.log(this.userCredentials)
      })
  }
  userCredentials:any = {}
  allBooks: Book[] = [];
  serbianBooks: any = []
  foreignBooks: any = []
  actionBooks:any = []
  adventureBooks:any = []
  biographyBooks: any = []
  childrensBooks:any = []
  classicsBooks:any = []
  crimeBooks:any = []
  dramaBooks:any = []
  fantasyBooks:any = []
  historyBooks:any = []
  horrorBooks:any = []
  humourBooks:any = []
  mangaBooks:any = []
  paranormalBooks:any = []
  philosophyBooks:any = []
  psychologyBooks: any = []
  religionBooks:any = []
  scienceBooks:any = []
  sciFiBooks:any = []
  sortByNameDescending:any = []
  sortByNameAscending:any = []

  getBooks() {
    return this.bookService.getAllBooks().subscribe(
      (response:any) => {
        this.allBooks = response
        console.log('bks', this.allBooks)
      },
        error => {
        console.log(error);
      }
    )
  }

  viewBook(isbn: string) {
    this.bookService.isbn = isbn
    localStorage.setItem('bookIsbn', isbn)
    this.bookService.getBookByIsbn().subscribe(
      data => {
        localStorage.setItem('bookData', JSON.stringify(data));
        this.router.navigate([`viewBook/:${isbn}`])
      }
    )
  }

  deleteBook(isbn: string) {
    const confirmed = window.confirm('Are you sure u want to delete this book?')
    if (confirmed) {
      this.bookService.deleteBook(isbn).subscribe(
        response => {
          location.reload();
          console.log(response)
        }
      )
    }
    else {
      console.log('delete canceled')
    }
    
  }

  editBookByIsbn(isbn: string) {
    this.bookService.isbn = isbn;
    localStorage.setItem('bookIsbn', isbn)
    this.bookService.getBookByIsbn().subscribe(
      data => {
        localStorage.setItem('bookData', JSON.stringify(data));
        this.router.navigate([`editBook/:${isbn}`])
      }
    )
  }
  
  getSerbianBooks() {
    this.bookService.getSerbianBooks().subscribe(response => {
      this.serbianBooks = response
      //console.log(this.serbianBooks)
    })
  }
  getForeignBooks() {
    this.bookService.getForeignBooks().subscribe(response => {
      this.foreignBooks = response
      //console.log(this.foreignBooks)
    })
  }


  ActionBooks() {
    return this.bookService.ActionBooks().subscribe(
      response => {
        this.actionBooks = response
        console.log("Action Books", this.actionBooks)
      }
    )
  }

  AdventureBooks() {
    return this.bookService.AdventureBooks().subscribe(
      response => {
        this.adventureBooks = response
        console.log("Adventure Books", this.adventureBooks)
      }
    )
  }

  BiographyBooks(){
    return this.bookService.BiographyBooks().subscribe(
      response => {
        this.biographyBooks = response
        console.log("Biography Books", this.biographyBooks)
      }
    )
  }

  ChildrensBooks() {
    return this.bookService.ChildrensBooks().subscribe(
      response => {
        this.childrensBooks = response
        console.log("Children Books", this.childrensBooks)
      }
    )
  }

  ClassicsBooks() {
    return this.bookService.ClassicsBooks().subscribe(
      response => {
        this.classicsBooks = response
        console.log("Classic Books", this.classicsBooks)
      }
    )
  }

  CrimeBooks() {
    return this.bookService.CrimeBooks().subscribe(
      response => {
        this.crimeBooks = response
        console.log("Crime Books", this.crimeBooks)
      }
    )
  }

  DramaBooks() {
    return this.bookService.DramaBooks().subscribe(
      response => {
        this.dramaBooks = response
        console.log("Drama Books", this.dramaBooks)
      }
    )
  }

  FantasyBooks() {
    return this.bookService.FantasyBooks().subscribe(
      response => {
        this.fantasyBooks = response
        console.log("Fantasy Books", this.fantasyBooks)
      }
    )
  }

  HistoryBooks() {
    return this.bookService.HistoryBooks().subscribe(
      response => {
        this.historyBooks = response
        console.log("History Books", this.historyBooks)
      }
    )
  }

  HorrorBooks() {
    return this.bookService.HorrorBooks().subscribe(
      response => {
        this.horrorBooks = response
        console.log("Horror Books:", this.horrorBooks)
      }
    )
  }

  HumourBooks() {
    return this.bookService.HumourBooks().subscribe(
      response => {
        this.humourBooks = response
        console.log("Humor Books", this.humourBooks)
      }
    )
  }

  MangaBooks() {
    return this.bookService.MangaBooks().subscribe(
      response => {
        this.mangaBooks = response
        console.log("Mangas List", this.mangaBooks)
      }
    )
  }

  ParanormalBooks() {
    return this.bookService.ParanormalBooks().subscribe(
      response => {
        this.paranormalBooks = response
        console.log("Paranormal Books", this.paranormalBooks)
      }
    )
  }

  PhilosophyBooks() {
    return this.bookService.PhilosophyBooks().subscribe(
      response => {
        this.philosophyBooks = response
        console.log("Philosophy Books", this.philosophyBooks)
      }
    )
  }

  PsychologyBooks() {
    return this.bookService.PsychologyBooks().subscribe(
      response => {
        this.psychologyBooks = response
        console.log("Psychology Books", this.psychologyBooks)
      }
    )
  }

  ReligionBooks(){
    return this.bookService.ReligionBooks().subscribe(
      response => {
        this.religionBooks = response
        console.log("Religion Books", this.religionBooks)
      }
    )
  }

  ScienceBooks(){
    return this.bookService.ScienceBooks().subscribe(
      response => {
        this.scienceBooks = response
        console.log("Science Books:", this.scienceBooks)
      }
    )
  }

  SciFiBooks(){
    return this.bookService.SciFiBooks().subscribe(
      response => {
        this.sciFiBooks = response
        console.log("Sci-Fi Books", this.sciFiBooks)
      }
    )
  }

  nameDescending() {
    return this.bookService.sortByNameDescending().subscribe(
      response => {
        this.sortByNameDescending = response
        console.log('desc books', this.sortByNameDescending)
      }
    )
  }

  nameAscending() {
    return this.bookService.sortByNameAscending().subscribe(
      response => {
        this.sortByNameAscending = response
        console.log('asc books', this.sortByNameAscending)
      }
    )
  }
  
  allBooksActive:boolean = true
  showAllBooks() {
    this.allBooksActive = true;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false; 
  }

  foreignBooksActive: boolean = false
  showForeignBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = true;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false;
  }

  serbianBooksActive: boolean = false
  showSerbianBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = true;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive= false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false;
  }

  actionBooksActive:boolean = false
  showActionBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = true;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false;
  }

  adventureBooksActive:boolean = false
  showAdventureBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = true;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false;
  }

  biographyBooksActive:boolean = false
  showBiographyBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = true;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false;
  }

  childrensBooksActive:boolean = false
  showChildrensBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = true;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false;
  }

  classicsBooksActive:boolean = false
  showClassicsBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = true;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false;
  }
  
  crimeBooksActive:boolean = false
  showCrimeBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = true;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false;
  }

  dramaBooksActive:boolean = false
  showDramaBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = true;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false;
  }

  fantasyBooksActive:boolean = false
  showFantasyBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = true;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false;
  }

  historyBooksActive:boolean = false
  showHistoryBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = true;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false;
  }

  horrorBooksActive:boolean = false
  showHorrorBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = true;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false;
  }

  humourBooksActive:boolean = false
  showHumourBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = true;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false;
  }

  mangaBooksActive:boolean = false
  showMangaBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = true;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false;
  }

  
  paranormalBooksActive:boolean = false
  showParanormalBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = true;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false;
  }

  philosophyBooksActive:boolean = false
  showPhilosophyBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = true;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false;
  }

  psychologyBooksActive:boolean = false
  showPsychologyBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = true;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false;
  }

  religionBooksActive:boolean = false
  showReligionBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = true;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false;
  }

  scienceBooksActive:boolean = false
  showScienceBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = true;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false;
  }

  sciFiBooksActive:boolean = false
  showSciFiBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = true;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = false;
  }

  sortByNameDescendingActive:boolean =false;
  showBooksByNameDescending() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = true;
    this.sortByNameAscendingActive = false;
  }

  sortByNameAscendingActive:boolean =false;
  showBooksByNameAscending() {
    this.allBooksActive = false;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooksActive = false;
    this.adventureBooksActive = false;
    this.biographyBooksActive = false;
    this.childrensBooksActive = false;
    this.classicsBooksActive = false;
    this.crimeBooksActive = false;
    this.dramaBooksActive = false;
    this.fantasyBooksActive = false;
    this.historyBooksActive = false;
    this.horrorBooksActive = false;
    this.humourBooksActive = false;
    this.mangaBooksActive = false;
    this.paranormalBooksActive = false;
    this.philosophyBooksActive = false;
    this.psychologyBooksActive = false;
    this.religionBooksActive = false;
    this.scienceBooksActive = false;
    this.sciFiBooksActive = false;
    this.sortByNameDescendingActive = false;
    this.sortByNameAscendingActive = true;
  }

  cart: any
  currentCart: any
  addToCart(bookId: number, quantity: number) {
    this.cartService.addToCart(bookId, quantity).subscribe(
      cart=> {
        this.cart = cart;
        this.currentCart = cart.cartId
        console.log(cart)
        console.log(this.currentCart)
      }
    )
  }
  removeFromCart(cartId:number ,bookId: number) {
    this.cartService.removeFromCart(cartId, bookId)
  }

  
 
}
