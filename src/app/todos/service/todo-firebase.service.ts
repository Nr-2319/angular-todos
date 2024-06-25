import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable, from } from 'rxjs';
import { TodoInterface } from '../types/todo.interface';
import { collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TodoFirebaseService {
  // inject firestore to servie
  firestore = inject(Firestore);
  // collection created in firebase
  todosCollection = collection(this.firestore, 'todos');

  // go through collection and get id field, text and isCompleted from the collection Data interface ...converted to TodoInterface by typescript
  getTodos(): Observable<TodoInterface[]> {
    return collectionData(this.todosCollection, {
      idField: 'id',
    }) as Observable<TodoInterface[]>;
  }

  addTodo(text: string): Observable<string> {
    const todoToCreate = { text, isCompleted: false };

    // firebase returns id and not whole object as promise
    const promise = addDoc(this.todosCollection, todoToCreate).then(
      (response) => response.id
    );

    // rxjs will convert the promise to Observable<string>
    return from(promise);
  }

  removeTodo(todoId: string): Observable<void> {
    // record reference with id
    const docRef = doc(this.firestore, 'todos/' + todoId);

    // delete the record from the firebase
    const promise = deleteDoc(docRef);

    return from(promise);
  }

  updateTodo(
    todoId: string,
    dataToUpdate: { text: string; isCompleted: boolean }
  ): Observable<void> {
    // record reference with id
    const docRef = doc(this.firestore, 'todos/' + todoId);

    const promise = setDoc(docRef, dataToUpdate);

    return from(promise);
  }

  constructor() {}
}
