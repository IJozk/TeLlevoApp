import { Injectable, QueryList, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, where, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);

  // ----------- Autenticacion ---------------

  // ----------- Sign in ---------------------
  sigin(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // ----------- Sign up ---------------------
  signUp(user: User){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // ----------- Update user ------------------
  updateUser(displayName: string){
    return updateProfile(getAuth().currentUser, {displayName});
  }

  // ----------- Recuperar Contraseña ----------
  sendRecoveryEmail(email: string){
    return sendPasswordResetEmail(getAuth(), email);
  }

  // ------------- BBDD -----------------------
  // ----------- Guardar en bbdd --------------
  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path), data);
  }

  // ----------- Buscar en bbdd --------------
  async getDocument(path: string){
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  // ----------- Autos por dueño -------------
  async autosByOwner(email: string){
  const autos: any[] = [];
  let i : number = 0;
  const autosQuery = this.firestore.collection('autos')
  await autosQuery.get().forEach(async querySnapshot => {
    if (!querySnapshot.empty) {
      while (!querySnapshot.empty) {
      const snapshot = querySnapshot.docs[i].data()
      if (snapshot['conductor'] == email){
        autos.push(snapshot)
      }  // use only the first document, but there could be more
      i = i+1;
    }
    
    }
    else {
        // decide what you want to do if the query returns no documents.
    }
  })
  console.log('mis autos');
  console.log(autos)
  return autos
  
  }

}
