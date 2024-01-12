import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';

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

}
