import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ProductType} from "../../../../assets/types/product.type";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {CommentType} from "../../../../assets/types/comment.type";
import {CommentService} from "../../../shared/services/comment.service";
import {AuthService} from "../../../core/auth/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {DefaultResponseType} from "../../../../assets/types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ReactionType} from "../../../../assets/types/reaction.type";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  product: ProductType;
  relatedProducts: ProductType[];
  comments: CommentType[] = [];
  serverStaticPath = environment.serverStaticPath;
  isLogged: boolean = false;
  totalCommentsCount: number = 0;
  canLoadMoreComments: boolean = true;
  userReactions: ReactionType[] = [];
  displayedCommentsCount: number = 3;

  commentForm = this.fb.group({
    text: ['', [Validators.required]]
  });

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private commentService: CommentService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar) {
    this.isLogged = this.authService.getIsLoggedIn();
    this.product = {
      id: '',
      title: '',
      description: '',
      image: '',
      date: '',
      category: '',
      url: '',
    };
    this.relatedProducts = [
      {
        id: '',
        title: '',
        description: '',
        image: '',
        date: '',
        category: '',
        url: '',
      }
    ];
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });

    this.activatedRoute.params.subscribe(params => {
      this.productService.getProduct(params['url'])
        .subscribe((data: ProductType) => {
          this.product = data;
          if (data.comments && data.commentsCount) {
            this.comments = data.comments;
            this.totalCommentsCount = +data.commentsCount || 0;
          }

          if (this.isLogged) {
            this.commentService.getReactions(this.product.id)
              .subscribe((data: ReactionType[]) => {
                this.userReactions = data;
              });
          }

        })

      this.productService.getRelatedProduct(params['url'])
        .subscribe((relatedData: ProductType[]) => {
          this.relatedProducts = relatedData;
        });
    });
  }

  getUserReaction(commentId: string): string | null {
    const reaction = this.userReactions.find(r => r.comment === commentId);
    return reaction ? reaction.action : null;
  }

  addComment() {
    if (this.commentForm.valid && this.commentForm.value.text) {
      this.commentService.addComment(this.commentForm.value.text, this.product.id)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (data.error) {
              this._snackBar.open(data.message);
              throw new Error(data.message);
            }

            this._snackBar.open(data.message);
            this.allComments();
            this.commentForm.reset();
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка добавления комментария');
            }
          }
        });

    }
  }

  allComments(loadMore: boolean = false) {
    const params = {
      offset: loadMore ? this.displayedCommentsCount : 0,
      article: this.product.id
    };

    this.commentService.getComments(params).subscribe({
      next: (data) => {
        if (data && data.comments) {
          let newComments = data.comments;

          if (loadMore) {
            this.comments = [...this.comments, ...newComments];
          } else {
            this.comments = [...newComments, ...this.comments];
            this.comments = this.comments.slice(0, 3); //только первые 3 коммента
          }

          this.displayedCommentsCount = this.comments.length;
          this.checkIfCanLoadMoreComments();
        }
      },
      error: (errorResponse) => {
        this._snackBar.open('Ошибка загрузки комментариев');
      }
    });
  }


  checkIfCanLoadMoreComments() {
    this.canLoadMoreComments = this.comments.length < this.totalCommentsCount;
  }

  addReaction(action: string, commentId: string) {
    const existingReactionIndex = this.userReactions.findIndex(r => r.comment === commentId);

    if (existingReactionIndex !== -1) {
      if (this.userReactions[existingReactionIndex].action === action) {
        this.userReactions.splice(existingReactionIndex, 1);
      } else {
        if (action === 'like' || action === 'dislike') {
          this.userReactions[existingReactionIndex].action = action;
        } else {
          this.userReactions.push({comment: commentId, action});
        }
      }
    } else {
      this.userReactions.push({comment: commentId, action});
    }

    this.commentService.addReaction(action, commentId).subscribe({
      next: (data: DefaultResponseType) => {
        if (data.error) {
          this._snackBar.open(data.message);
          throw new Error(data.message);
        } else {
          if (action === 'violate') {
            this._snackBar.open('Жалоба отправлена');
          } else {
            this._snackBar.open('Ваш голос учтен!');
          }
        }
      },
      error: (error) => {
        this._snackBar.open('Жалоба уже отправлена');
      }
    });
  }
}
