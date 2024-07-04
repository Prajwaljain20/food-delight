import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IRestaurant } from '../models/restaurant.interface';
import { RestaurantService } from '../services/restaurant.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'cost', 'rating', 'action'];
  dataSource!: IRestaurant[];
  data!: IRestaurant[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private restaurantService: RestaurantService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.restaurantService.getAllRestaurants().subscribe(res => {
      this.dataSource = res;
      this.data = this.dataSource;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue === '') {
      this.data = this.dataSource;
    } else {
      const inputValue = filterValue.trim().toLowerCase();
      this.data = this.dataSource.filter(data => {
        data.name.toLowerCase().includes(inputValue) || data.address.toLowerCase().includes(inputValue) ||
        data.category.toLowerCase().includes(inputValue) || data.dishes.filter(dish => dish === inputValue) ||
        data.cost.toString().includes(inputValue) || data.rating.toString().includes(inputValue)
      });
    }
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRestaurant(id);
      }
    });
  }

  deleteRestaurant(id: string): void {
    this.restaurantService.deleteRestaurantById(id).then(() => {
      this.snackBar.open('Restaurant Deleted!', 'Close' ,{duration: 4000});
    });
  }

  goToEdit(id: number): void {
    this.router.navigate(['edit', id]);
  }

  viewRestaurant(id: number): void {
    this.router.navigate(['view', id]);
  }
}
