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
        }  
        i = i+1;
      }
    }
    else { }
  })
  console.log('mis autos');
  console.log(autos)
  return autos
  }

  async viajesbyOwner(email: string){
    const date: Date = new Date();
    const dateformat :string = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
    const viajes: any[] = [];
    let i : number = 0;
    const viajesQuery = this.firestore.collection('viajes')
    await viajesQuery.get().forEach(async querySnapshot => {
      if (!querySnapshot.empty) {
        while (!querySnapshot.empty) {
          const snapshot = querySnapshot.docs[i].data()
          if (snapshot['conductor'] == email && snapshot['fecha'] == dateformat && snapshot['estado'] == 'creado'){
            viajes.push(snapshot);
          }  
          i = i+1;
        }
      }
      else { }
    })
    console.log('mis viajes');
    console.log(viajes)
    return viajes
    }


}
