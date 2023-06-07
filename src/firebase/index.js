/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import {
  getFirestore, setDoc, doc, collection, addDoc, getDocs, onSnapshot,
  deleteDoc, getDoc,
} from 'firebase/firestore';
import {
  getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,
} from 'firebase/auth';
import { app } from './init.js';

export const auth = getAuth(app);
export const db = getFirestore(app);

// FUNCIÓN ENTRAR CON CORREO Y CONTRASEÑA
export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

// FUNCIÓN REGISTRO
export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

// FUNCIÓN GUARADR USUARIO
export const updateName = (displayName) => {
  updateProfile(auth.currentUser, { displayName });
};

// FUNCIÓN GUARADR DATOS USUARIO EN FIRESTORE
export const savedUser = (displayName, email, password, uid) => setDoc(doc(db, 'users', uid), {
  displayName,
  email,
  password,
  uid,
});

// FUNCIÓN MOSTRAR DATOS DE USUARIO
export const currentUserInfo = () => auth.currentUser;

// LOGIN CON GOOGLE
const provider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, provider);

export const publicacion = (inputModalPost, coordenadas, selecImg) => {
  addDoc(collection(db, 'publicaciones'), { post: inputModalPost, coords: coordenadas, imagen: selecImg });
};

export const allPublication = () => getDocs(collection(db, 'publicaciones'));

export const newPublications = (callback) => onSnapshot(collection(db, 'publicaciones'), callback);

export const deletePublication = (id) => deleteDoc(doc(db, 'publicaciones', id));

export const editPublication = (id) => getDoc(doc(db, 'publicaciones', id));
