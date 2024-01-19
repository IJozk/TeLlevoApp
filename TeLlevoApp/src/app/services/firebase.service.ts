import { Injectable, QueryList, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, where, collection } from '@angular/fire/firestore';
import { Viaje } from '../models/viaje.model';
import { addDoc, updateDoc } from 'firebase/firestore';

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

  // ----------- Add doc (Auto generated id) ----------------------
  addDocument(path: string, data: any){
    return addDoc( collection(this.firestore.firestore , path) , data);
  }

  // ------------ Update doc -----------------
  updateDocument(path: string ,field: string, value: string){
    return updateDoc(doc(getFirestore(), path) , field , value);
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

  async viajebyOwner(email: string){
    const date: Date = new Date();
    const dateformat:string = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
    let convtime: Date;
    let viaje: any;
    const docs = await this.firestore.firestore.collection('viajes').where("conductor","==",email).where("fecha","==",dateformat).where("estado", 'in' , ['creado','iniciado']).get();
      docs.forEach( doc => {
        convtime = new Date(doc.get('fecha')+' '+doc.get('hora')+':00');
        if (doc.get('fecha') == dateformat && convtime > date) {
          viaje = doc.data(); 
          console.log('sisisisiis: '+doc.get('fecha'));
          return viaje
        }
        else if (convtime < date){
          this.updateDocument(`viajes/${doc.get('uid')}`, 'estado', 'caducado')
          return null
        }
        else { 
          return null 
        } 
      })
        
    console.log('mi viaje');
    console.log(viaje)
    return viaje
    }

    async viajebyDest(dest: string){
      const date: Date = new Date();
      const dateformat:string = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
      let convtime: Date;
      let viaje: any;
      const docs = await this.firestore.firestore.collection('viajes').where("destino","==",dest).where("estado","==",'creado').where("fecha","==",dateformat).get();
        docs.forEach( doc => {
          convtime = new Date(doc.get('fecha')+' '+doc.get('hora')+':00');
          if (doc.get('fecha') == dateformat && convtime > date) {
            viaje = doc.data(); 
            console.log('sisisisiis: '+doc.get('fecha'));
            return viaje
          }
          else if (convtime < date){
            this.updateDocument(`viajes/${doc.get('uid')}`, 'estado', 'caducado')
            return null
          }
          else { 
            return null 
          } 
        })
          
      console.log('mi viaje');
      console.log(viaje)
      return viaje
      }

    async viajesAll(){
      const date: Date = new Date();
      const dateformat:string = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
      let convtime: Date;
      let viajes: any[]=[];
      const docs = await this.firestore.firestore.collection('viajes').where("estado","==",'creado').where("fecha","==",dateformat).where("asientos","!=", '0').get();
        docs.forEach( doc => {
          convtime = new Date(doc.get('fecha')+' '+doc.get('hora')+':00');
          console.log('sisisisiis: '+doc.get('fecha'));
          if (doc.get('fecha') == dateformat && convtime > date) {
            viajes.push(doc.data())
            return viajes
          }
          else if (convtime < date){
            this.updateDocument(`viajes/${doc.get('uid')}`, 'estado', 'caducado')
            return null
          }
          else { 
            return null 
          } 
        })
      console.log('mi viaje');
      console.log(viajes)
      return viajes
    }

    async viajesbyOwner(email: string){
      const viajes: any[] = [];
      let i : number = 0;
      const viajesQuery = this.firestore.collection('viajes')
      await viajesQuery.get().forEach(async querySnapshot => {
        if (!querySnapshot.empty) {
          while (!querySnapshot.empty) {
            const snapshot = querySnapshot.docs[i].data()
            viajes.push(snapshot);
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
