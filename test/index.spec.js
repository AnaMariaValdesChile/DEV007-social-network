// eslint-disable-next-line import/no-extraneous-dependencies
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import {
  addDoc, orderBy, deleteDoc, updateDoc,
} from 'firebase/firestore';
import {
  signIn, createUser, updateName, post, updatePost, like, disLike, deleteDocData, orderPosts,
} from '../src/firebase';

jest.mock('@firebase/auth');

jest.mock('@firebase/firestore');

console.log(signInWithEmailAndPassword);
console.log(addDoc);

describe('signIn', () => {
  it('debe ser una funcion', () => expect(typeof signIn).toBe('function'));

  it('Deberia llamar a la funcion signInWithEmailAndPassword', async () => {
    await signIn('an.valdes.rodriguez@gmail.com', 'magdalena');
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });

  it('Deberia retornar un objeto con la propiedad user.email', async () => {
    signInWithEmailAndPassword.mockReturnValueOnce({ user: { email: 'an.valdes.rodriguez@gmail.com' } });
    const respuesta = await signIn('an.valdes.rodriguez@gmail.com', 'magdalena');
    expect(respuesta.user.email).toBe('an.valdes.rodriguez@gmail.com');
  });
});

describe('createUser', () => {
  it('debe ser una funcion', () => expect(typeof createUser).toBe('function'));

  it('Deberia llamar a la funcion createUserWithEmailAndPassword', async () => {
    await createUser('an.valdes.rodriguez@gmail.com', 'magdalena');
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });

  it('Deberia retornar un objeto con la propiedad user.email', async () => {
    createUserWithEmailAndPassword.mockReturnValueOnce({ user: { email: 'an.valdes.rodriguez@gmail.com' } });
    const respuesta = await createUser('an.valdes.rodriguez@gmail.com', 'magdalena');
    expect(respuesta.user.email).toBe('an.valdes.rodriguez@gmail.com');
  });
});

describe('updateName', () => {
  it('debe ser una funcion', () => expect(typeof updateName).toBe('function'));

  it('Deberia llamar a la funcion updateProfile', async () => {
    await updateName('an.valdes.rodriguez@gmail.com', '_');
    expect(updateProfile).toHaveBeenCalled();
  });
});

describe('post', () => {
  it('debe ser una funcion', () => expect(typeof post).toBe('function'));

  it('Deberia llamar a la funcion addDoc', async () => {
    await post('texto', { lat: 0, lng: 0 }, 'img.jpeg', '_');
    expect(addDoc).toHaveBeenCalled();
  });
});

describe('orderPosts', () => {
  it('debe ser una funcion', () => expect(typeof orderPosts).toBe('function'));

  it('Deberia llamar a la funcion orderBy', async () => {
    await orderPosts('an.valdes.rodriguez@gmail.com', '_');
    expect(orderBy).toHaveBeenCalled();
  });
});

describe('deleteDocData', () => {
  it('debe ser una funcion', () => expect(typeof deleteDocData).toBe('function'));

  it('Deberia llamar a la funcion deleteDoc', async () => {
    await deleteDocData('xxxxxxxxxx');
    expect(deleteDoc).toHaveBeenCalled();
  });
});

describe('updatePost', () => {
  it('debe ser una funcion', () => expect(typeof updatePost).toBe('function'));

  it('Deberia llamar a la funcion updateDoc', async () => {
    await updatePost('xxxxxxxxxx', 'nuevo post');
    expect(updateDoc).toHaveBeenCalled();
  });
});

describe('like', () => {
  it('debe ser una funcion', () => expect(typeof like).toBe('function'));

  it('Deberia llamar a la funcion updateDoc', async () => {
    await like('xxxxxxxxxx', 'like');
    expect(updateDoc).toHaveBeenCalled();
  });
});

describe('disLike', () => {
  it('debe ser una funcion', () => expect(typeof disLike).toBe('function'));

  it('Deberia llamar a la funcion updateDoc', async () => {
    await disLike('xxxxxxxxxx', 'dislike');
    expect(updateDoc).toHaveBeenCalled();
  });
});
