import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { ICategories } from '../models/categories.interface';
import { IDishes } from '../models/dishes.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IRestaurant } from '../models/restaurant.interface';

@Component({
  selector: 'app-add-edit-restaurant',
  templateUrl: './add-edit-restaurant.component.html',
  styleUrls: ['./add-edit-restaurant.component.css']
})
export class AddEditRestaurantComponent implements OnInit {

  isViewMode: boolean = false;
  isEditMode: boolean = false;
  isCreateMode: boolean = false;
  categories: ICategories[] = [];
  dishes: IDishes = {names: []};
  form!: FormGroup;
  addEditView: string = '';
  imageFile!: File;
  file: string = '';
  restaurantDetail!: IRestaurant;
  @ViewChild('image') image!: ElementRef

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      if (param['id'] === 'add') {
        this.addEditView = 'Add New Restaurant';
        this.isCreateMode = true;
      } else if (param['id'] === 'edit') {
        this.addEditView = 'Update Restaurant';
        this.isEditMode = true;
        this.getRestaurantData(param['restaurantId']);
      } else {
        this.isViewMode = true;
        this.getRestaurantData(param['restaurantId']);
      }
    });
    this.initForm();
    this.getAllCategories();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
      dishes: ['', Validators.required],
      address: ['', Validators.required],
      cost: ['', Validators.required],
      rating: [0, Validators.required]
    })
  }

  getAllCategories(): void {
    this.restaurantService.getCategories().subscribe(res => {
      this.categories = res;
      if (this.isEditMode && this.restaurantDetail) {
        this.onCategoriesChange();
      }
    })
  }

  getRestaurantData(id: string): void {
    this.restaurantService.getRestaurantById(id).subscribe(res=> {
      this.restaurantDetail = res;
      if (this.isEditMode) {
        this.setFormValues();
      } else if (this.isViewMode) {
        this.addEditView = this.restaurantDetail.name;
        this.imageFile = new File([this.restaurantDetail.image], 'Image');
        this.image.nativeElement.src = URL.createObjectURL((this.restaurantDetail.image as unknown) as Blob);
      }
    });
  }

  setFormValues(): void {
    this.form.patchValue({
      ...this.restaurantDetail
    });
    this.imageFile = new File([this.restaurantDetail.image], 'Image');
    this.image.nativeElement.src = URL.createObjectURL((this.restaurantDetail.image as unknown) as Blob);
    if (this.categories.length > 0) {
      this.onCategoriesChange();
    }
  }

  onSave(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.patchFormValues();
    }
  }

  patchFormValues(): void {
    if (this.isCreateMode) {
      const request = {...this.form.value, id: 0};
      this.restaurantService.addRestaurant(request).then(() => {
        this.snackBar.open('Added Restaurant Successfully!', '' ,{duration: 4000});
        this.router.navigate(['']);
      });
    } else if (this.isEditMode) {
      const request = {...this.form.value, id: this.restaurantDetail.id};
      this.restaurantService.updateRestaurantById(request).then(() => {
        this.snackBar.open('Updated Restaurant Successfully!', '' ,{duration: 4000});
        this.router.navigate(['']);
      });
    }
  }

  onCategoriesChange(): void {
    const category = this.categories.find(category => category.name === this.form.value.category);
    this.restaurantService.getDishesByCategory(category!.id).subscribe(res=> {
      this.dishes = res;
    });
  }

  onFileSelection(event: Event): void {
    let filesSelected = (event.target as HTMLInputElement).files ?? null;
    if (filesSelected) {
      this.getFileBase64(filesSelected[0]);
    }
  }

  getFileBase64(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.imageFile = file;
    reader.onload = (): void => {
      this.file = reader.result as string;
      this.form.patchValue({
        image: this.file
      });
      this.image.nativeElement.src = '';
      this.image.nativeElement.src = URL.createObjectURL(file);
    }
  }
}
