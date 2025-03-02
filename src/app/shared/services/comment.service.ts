import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DefaultResponseType} from "../../../assets/types/default-response.type";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {CommentType} from "../../../assets/types/comment.type";
import {ReactionType} from "../../../assets/types/reaction.type";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComments(params: {offset: number, article: string}): Observable<{allCount: number, comments: CommentType[]}> {
    return this.http.get<{allCount: number, comments: CommentType[]}>(environment.api + 'comments', {
      params
    });
  }

  addComment(text: string, article: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', {
      text, article
    });
  }

  addReaction(action: string, id: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments/' + id + '/apply-action', {
      action
    });
  }

  getReaction(id: string): Observable<ReactionType> {
    return this.http.get<ReactionType>(environment.api + 'comments/' + id + '/actions');
  }

  getReactions(id: string): Observable<ReactionType[]> {
    return this.http.get<ReactionType[]>(environment.api + 'comments/article-comment-actions', {
      params: { articleId: id }
    });
  }

}
