import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getAvatars(){
      return this.db.collection('/messages').valueChanges()
  }

  getUser(userKey){
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  updateMessage(userKey, value){
    return this.db.collection('messages').doc(userKey).update({
      "responseText": value
    });
  }

  deleteUser(userKey){
    return this.db.collection('users').doc(userKey).delete();
  }

  getMessages(){
    return this.db.collection('messages').snapshotChanges();
  }


  searchUsers(searchValue){
    return this.db.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchUsersByAge(value){
    return this.db.collection('users',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createUser(value, avatar){
    return this.db.collection('users').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age),
      avatar: avatar
    });
  }
}
