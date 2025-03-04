import {Component, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ProductType} from "../../../assets/types/product.type";
import {ProductService} from "../../shared/services/product.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DefaultResponseType} from "../../../assets/types/default-response.type";
import {RequestService} from "../../shared/services/request.service";
import {RequestType} from "../../../assets/types/request.type";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    dots: true,
    nav: false,
    items: 1,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  };

  customOptionsReviews: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 26,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
    },
    nav: false
  };

  services = [
    {
      image: 'service1.png',
      name: 'Создание сайтов',
      description: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      price: '7 500',
    },
    {
      image: 'service2.png',
      name: 'Продвижение',
      description: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      price: '3 500',
    },
    {
      image: 'service3.png',
      name: 'Реклама',
      description: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      price: '1 000',
    },
    {
      image: 'service4.png',
      name: 'Копирайтинг',
      description: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      price: '750',
    },
  ];

  reviews = [
    {
      image: 'review1.png',
      name: 'Станислав',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.'
    },
    {
      image: 'review2.png',
      name: 'Алёна',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.'
    },
    {
      image: 'review3.png',
      name: 'Мария',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
    },
    {
      image: 'review4.jpg',
      name: 'Аделина',
      text: 'Хочу поблагодарить всю команду за помощь в создании блога!'
    },
  ]
  products: ProductType[] = [];
  isPopUp: boolean = false;
  isSuccess: boolean = false;
  selectedService: string = '';
  popUpType: string = '';
  hasError: boolean = false;

  popupForm = this.fb.group({
    service: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', [Validators.required]]
  });

  constructor(private productService: ProductService,
              private requestService: RequestService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.productService.getPopularProducts()
      .subscribe((data: ProductType[]) => {
        this.products = data;
      });
  }

  closePopUp() {
    this.isPopUp = false;
  }

  openPopUp(serviceName: string, type: string) {
    this.selectedService = serviceName;
    this.isPopUp = true;
    this.isSuccess = false;
    this.popUpType = type;
    this.popupForm.reset();
    this.popupForm.patchValue({ service: serviceName });
  }

  makeAppointment() {
    if (this.popupForm.valid && this.popupForm.value.service && this.popupForm.value.name && this.popupForm.value.phone) {
      const paramsObject: RequestType = {
        service: this.popupForm.value.service,
        name: this.popupForm.value.name,
        phone: this.popupForm.value.phone,
        type: this.popUpType
      };

      this.requestService.addRequest(paramsObject)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (data.error) {
              this.hasError = true;
              throw new Error(data.message);
            } else {
              this.isSuccess = true;
              this.hasError = false;
            }
          },
          error: () => {
            this.hasError = true;
            this._snackBar.open('Произошла ошибка при отправке формы, попробуйте еще раз.');
          }
        });

    }
  }
}
