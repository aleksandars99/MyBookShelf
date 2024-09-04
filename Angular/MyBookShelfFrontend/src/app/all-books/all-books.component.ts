import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../Services/book.service';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { Book } from '../Book';
import { AuthorService } from '../../Services/author.service';

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
    this.sciFiBooks();
    
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
      console.log(this.serbianBooks)
    })
  }
  getForeignBooks() {
    this.bookService.getForeignBooks().subscribe(response => {
      this.foreignBooks = response
      console.log(this.foreignBooks)
    })
  }


  ActionBooks() {
    return this.bookService.ActionBooks().subscribe(
      response => {
        this.actionBooks = response
        console.log(this.actionBooks)
      }
    )
  }

  AdventureBooks() {
    return this.bookService.AdventureBooks().subscribe(
      response => {
        this.adventureBooks = response
        console.log(this.adventureBooks)
      }
    )
  }

  BiographyBooks(){
    return this.bookService.BiographyBooks().subscribe(
      response => {
        this.biographyBooks = response
        console.log(this.biographyBooks)
      }
    )
  }

  ChildrensBooks() {
    return this.bookService.ChildrensBooks().subscribe(
      response => {
        this.childrensBooks = response
        console.log(this.childrensBooks)
      }
    )
  }

  ClassicsBooks() {
    return this.bookService.ClassicsBooks().subscribe(
      response => {
        this.classicsBooks = response
        console.log(this.classicsBooks)
      }
    )
  }

  CrimeBooks() {
    return this.bookService.CrimeBooks().subscribe(
      response => {
        this.crimeBooks = response
        console.log(this.crimeBooks)
      }
    )
  }

  DramaBooks() {
    return this.bookService.DramaBooks().subscribe(
      response => {
        this.dramaBooks = response
        console.log(this.dramaBooks)
      }
    )
  }

  FantasyBooks() {
    return this.bookService.FantasyBooks().subscribe(
      response => {
        this.fantasyBooks = response
        console.log(this.fantasyBooks)
      }
    )
  }

  HistoryBooks() {
    return this.bookService.HistoryBooks().subscribe(
      response => {
        this.historyBooks = response
        console.log(this.historyBooks)
      }
    )
  }

  HorrorBooks() {
    return this.bookService.HorrorBooks().subscribe(
      response => {
        this.horrorBooks = response
        console.log(this.horrorBooks)
      }
    )
  }

  HumourBooks() {
    return this.bookService.HumourBooks().subscribe(
      response => {
        this.humourBooks = response
        console.log(this.humourBooks)
      }
    )
  }

  MangaBooks() {
    return this.bookService.MangaBooks().subscribe(
      response => {
        this.mangaBooks = response
        console.log(this.mangaBooks)
      }
    )
  }

  ParanormalBooks() {
    return this.bookService.ParanormalBooks().subscribe(
      response => {
        this.paranormalBooks = response
        console.log(this.paranormalBooks)
      }
    )
  }

  PhilosophyBooks() {
    return this.bookService.PhilosophyBooks().subscribe(
      response => {
        this.philosophyBooks = response
        console.log(this.philosophyBooks)
      }
    )
  }

  PsychologyBooks() {
    return this.bookService.PsychologyBooks().subscribe(
      response => {
        this.psychologyBooks = response
        console.log(this.psychologyBooks)
      }
    )
  }

  ReligionBooks(){
    return this.bookService.ReligionBooks().subscribe(
      response => {
        this.religionBooks = response
        console.log(this.religionBooks)
      }
    )
  }

  ScienceBooks(){
    return this.bookService.ScienceBooks().subscribe(
      response => {
        this.scienceBooks = response
        console.log(this.scienceBooks)
      }
    )
  }

  SciFiBooks(){
    return this.bookService.SciFiBooks().subscribe(
      response => {
        this.sciFiBooks = response
        console.log(this.sciFiBooks)
      }
    )
  }
  
  allBooksActive:boolean = true
  showAllBooks() {
    this.allBooksActive = true;
    this.foreignBooksActive = false;
    this.serbianBooksActive = false;
    this.actionBooks = false;
    this.adventureBooks = false;
    this.biographyBooks = false;
    this.childrensBooks = false;
    this.classicsBooks = false;
    this.crimeBooks = false;
    this.dramaBooks = false;
    this.fantasyBooks = false;
    this.historyBooks = false;
    this.horrorBooks = false;
    this.humourBooks = false;
    this.mangaBooks = false;
    this.paranormalBooks = false;
    this.philosophyBooks = false;
    this.psychologyBooks = false;
    this.religionBooks = false;
    this.scienceBooks = false;
    this.sciFiBooks = false;
  }

  foreignBooksActive: boolean = false
  showForeignBooks() {
    this.allBooksActive = false;
    this.foreignBooksActive = true;
    this.serbianBooksActive = false;
    this.actionBooks = false;
    this.adventureBooks = false;
    this.biographyBooks = false;
    this.childrensBooks = false;
    this.classicsBooks = false;
    this.crimeBooks = false;
    this.dramaBooks = false;
    this.fantasyBooks = false;
    this.historyBooks = false;
    this.horrorBooks = false;
    this.humourBooks = false;
    this.mangaBooks = false;
    this.paranormalBooks = false;
    this.philosophyBooks = false;
    this.psychologyBooks = false;
    this.religionBooks = false;
    this.scienceBooks = false;
    this.sciFiBooks = false;
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
  }

  
 
}
