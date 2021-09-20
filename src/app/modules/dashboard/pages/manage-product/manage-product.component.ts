import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, ShopService, User } from '@app/core';
import { Product } from '@app/core/models/product.model';
import { Observable, Subject } from 'rxjs';
import { map, skipWhile, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit, OnDestroy{
  public defaultImageUrl = '../../../../../assets/images/placeholder-images-product.png';
  public error: string;

  public loading = false;
  public editMode = false;
  public productForm: FormGroup;

  public user$: Observable<User>;

  public productId: string | null;
  private productId$: Observable<string>;
  public product$: Observable<Product>;
  
  public image: any;
  public currentImage = this.defaultImageUrl;
  
  public filteredOptions: Observable<string[]>;
  public category = ["Informatics", "Electornics", "Accessories", "Music", "Mouses", "Keyboards", "PC"];
  
  
  @ViewChild('UploadImageInput', { static: false }) uploadImageInput: ElementRef;
  
  private unsubscribe$ = new Subject<void>();
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public shopService: ShopService,
  ) { 
    this.buildForm();
    this.user$ = this.authService.user$.pipe(takeUntil(this.unsubscribe$));
    this.productId$ = this.activatedRoute.params
      .pipe(
        takeUntil(this.unsubscribe$),
        map(params => params["id"]),
        tap(id => {
          if(id === undefined){
            this.editMode = false;
            this.loading = false;
          }else {
            this.editMode = true;
            this.loading = true;
          } 
        }),
        skipWhile(id => id === undefined),
        tap(id => this.productId = id),
      );

    this.product$ = this.productId$
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap(id => this.shopService.getProduct(id)),
        map(res => res.data),
        tap(product => this.fillForm(product)),
        tap(product => this.loadImage(product))
      );
  }

  ngOnInit(): void {
    this.user$.subscribe();
    this.product$.subscribe(() => this.loading = false);
    this.filteredOptions = this.productForm.get('category').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
   
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
  onFileSelect(event): void {
    const image = event.target.files[0];

    this.image = image;
    this.onImageRecived(image);
    this.productForm.get('uploadedImage').setValue(image);
  }

  onImageRecived(image: any): void {
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (_event) => {
      this.currentImage = reader.result as string;
    }
  }

  public loadImage(product: Product = null, image: any = null): void {
    if (this.editMode) {
      if (product) {
        this.currentImage = product.imageUrl + `?${Date.now()}`;
      }
      if (image) {
        this.onImageRecived(image)
      }
    } else {
      if (image) {
        this.onImageRecived(image)
      } else {
        this.currentImage = this.defaultImageUrl;
      }
    }

  }

  public deleteProduct(): void {
    this.shopService.deleteProduct(this.productId)
      .pipe(
        takeUntil(this.unsubscribe$),
        skipWhile(ok => ok === false),
        tap(() => this.router.navigate(['/shop/products']))
      ).subscribe();
  }

  public createOrUpdateProduct() {
    this.shopService.createOrUpdateProduct(this.editMode, this.productForm.value, this.productId)
    .pipe(
      takeUntil(this.unsubscribe$),
      tap(() => this.uploadImageInput.nativeElement.value = ""),
      // map(res => res.data._id),
      tap(id => this.router.navigate(['/shop'])),
    ).subscribe();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.category.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  private buildForm(): void {
    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      short: ['', [Validators.required]],
      description: [''],
      available: [true, [Validators.required]],
      uploadedImage: [null],
    });
  }

  private fillForm(product: Product) {
    this.productForm.setValue({
      title: product.title,
      price: product.price,
      category: product.category,
      available: product.available,
      short: product.short || '',
      description: product.description || '',
      uploadedImage: null,
    });
  }
}
