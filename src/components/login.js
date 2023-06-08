// import { onNavigate } from '../main';

import {
  currentUserInfo, publicacion, newPublications, deletePublication, editPublication, upDatePost,
} from '../firebase/index.js';
import headerImg from '../Images/headers.jpg';
import menuImg from '../Images/menu.png';
import nueve from '../Images/9.png';

export const Login = (onNavigate) => {
  // CREACIÓN DE INTERFAZ
  document.body.style.backgroundImage = 'none';
  document.body.style.backgroundColor = '#ffffff';
  const header = document.getElementById('header');
  header.style.backgroundImage = `url(${headerImg})`;
  const loginDiv = document.createElement('div');
  loginDiv.setAttribute('class', 'loginDiv');
  const menu = document.createElement('div');
  menu.setAttribute('id', 'menu');
  menu.setAttribute('class', 'menu');
  const labelLogin = document.createElement('label');
  labelLogin.setAttribute('class', 'labelLogin');
  labelLogin.setAttribute('id', 'labelLogin');
  const buttonMenu = document.createElement('button');
  buttonMenu.setAttribute('class', 'buttonMenu');
  buttonMenu.setAttribute('id', 'buttonMenu');
  buttonMenu.innerHTML = `
  <img src="${menuImg}" alt="buttonMenu">`;
  const menuOptionsDiv = document.createElement('div');
  menuOptionsDiv.setAttribute('class', 'menuOptionsDiv');
  menuOptionsDiv.setAttribute('id', 'menuOptionsDiv');
  const onlyMenu = document.createElement('div');
  onlyMenu.setAttribute('class', 'onlyMenu');

  loginDiv.appendChild(menu);
  menu.appendChild(labelLogin);
  menu.appendChild(onlyMenu);
  onlyMenu.appendChild(buttonMenu);

  loginDiv.innerHTML += `
  <input type="text" class="inputLogin" id="inputLogin" placeholder="Escribe tu publicación dando click aquí">
  <br>
  <dialog class="divModal" id="divModal"></dialog>
  <br>
  <div class="containerPublications">Aquí irán las publicaciones</div>
  <br>`;

  // FUNCIONALIDAD ETIQUETA DE BIENVENIDA AL USUARIO
  console.log(currentUserInfo());
  // si hay información del usuario por parte de la app obtiene de ahí el nombre del usuario, si no
  // la obtiene de la data de localstorage usando .parse para convertir la data a un objeto js
  const userName = currentUserInfo() ? currentUserInfo().displayName : JSON.parse(localStorage.getItem('user')).displayName;
  loginDiv.querySelector('#menu').querySelector('#labelLogin').textContent = `Bienvenid@ ${userName}!`;

  // FUNCIONALIDAD MENU
  menuOptionsDiv.innerHTML = `
        <button class="close" id="close"><img src="${nueve}" alt="buttonMenu"></button>
        <a href="" class="optionMenu" id="acercaDe" style="text-decoration:none">Acerca de</a>
        <a href="" class="optionMenu" id="perfil" style="text-decoration:none">Perfil</a>
        <a href="" class="optionMenu" id="cerrarSesion" style="text-decoration:none">Cerrar sesión</a>`;

  loginDiv.querySelector('#buttonMenu').addEventListener('click', () => { // abrir menu
    menuOptionsDiv.style.display = 'block';
    menuOptionsDiv.style.display = 'flex';
    loginDiv.querySelector('#menu').querySelector('.onlyMenu').insertAdjacentElement('beforeend', menuOptionsDiv);
    loginDiv.querySelector('#menu').querySelector('#close').addEventListener('click', () => { // cerrar menú
      menuOptionsDiv.style.display = 'none';
    });
    loginDiv.querySelector('#menu').querySelector('#menuOptionsDiv').querySelector('#cerrarSesion').addEventListener('click', () => {
      localStorage.removeItem('user'); // si cierra sesión, la info del usuario se elimina del localstorage
      onNavigate('/');
    });
  });

  // FUNCIONALIDAD MODAL POSTS
  const windowsModal = loginDiv.querySelector('#divModal');
  windowsModal.style.display = 'none';

  loginDiv.querySelector('#inputLogin').addEventListener(
    'click',
    () => {
      windowsModal.innerHTML = `
        <button class="closeModal" id="closeModal"><img src="${nueve}" alt="buttonMenu"></button>
        <form class="formulario">
        <label class="labelModal">Texto:</label>
        <input type="text" class="inputModalPost" placeholder="Escribe aquí">
        <label class="labelModal">Coordenadas:</label>
        <input type="text" class="inputModal" placeholder="Escribe aquí">
        <div class="divImgModal"> 
          <label class="labelModal">Imagen:</label>
          <input type="file" class="buttonModalImg" id="buttonModalImg"></input>
        </div>
        <label class="labelErrorsModal" id="labelErrorsModal"></label>
        <br>
        <button type="button" class="buttonModalPublish" id="buttonModalPublish">Publicar</button>
        </form>`;
      windowsModal.showModal();
      windowsModal.style.display = 'block';
      windowsModal.style.display = 'flex';
      const btnClose = loginDiv.querySelector('#divModal').querySelector('#closeModal'); // variable que almacena el boton de cerrar la ventana modal
      const btnPublish = loginDiv.querySelector('#divModal').querySelector('#buttonModalPublish');

      btnPublish.addEventListener('click', async () => {
        const inputModalPost = windowsModal.querySelector('.formulario').querySelector('.inputModalPost').value;
        const coordenadas = windowsModal.querySelector('.formulario').querySelector('.inputModal').value;
        const selecImg = windowsModal.querySelector('.formulario').querySelector('.divImgModal').querySelector('#buttonModalImg').value;
        if (inputModalPost && coordenadas) {
          publicacion(inputModalPost, coordenadas, selecImg);
          windowsModal.close();
          windowsModal.style.display = 'none';
          console.log(inputModalPost, coordenadas, selecImg);
          // loginDiv.querySelector('.containerPublications').appendChild();
        } else {
          windowsModal.querySelector('.formulario').querySelector('#labelErrorsModal').textContent = 'Debe rellenar todos los campos';
        }
      });
      btnClose.addEventListener('click', () => {
        windowsModal.close();
        windowsModal.style.display = 'none';
      });
    },
  );
  const containerPublications = loginDiv.querySelector('.containerPublications');
  // console.log(containerPublications);
  window.addEventListener('DOMContentLoaded', async () => {
    newPublications((querySnapshot) => {
      let html = '';
      querySnapshot.forEach((doc) => {
        const publication = doc.data();
        html += `
      <div class="posts"> 
      <h3>${publication.post}</h3>
      <h3>${publication.coords}</h3>
      <button class="btnDelete" data-id="${doc.id}">Eliminar</button>
      <button class="btnEdit" data-id="${doc.id}">Editar</button>
      </div>`;
      });
      containerPublications.innerHTML = html;
      const buttonDelete = containerPublications.querySelectorAll('.btnDelete');
      buttonDelete.forEach((btn) => btn.addEventListener('click', ({ target: { dataset } }) => {
        deletePublication(dataset.id);
      }));
      const buttonEdit = containerPublications.querySelectorAll('.btnEdit');
      let idPublished = '';

      buttonEdit.forEach((btn) => btn.addEventListener('click', async ({ target: { dataset } }) => {
        const doc = await editPublication(dataset.id);
        windowsModal.innerHTML = `
        <button class="closeModal" id="closeModal"><img src="${nueve}" alt="buttonMenu"></button>
        <form class="formulario">
        <label class="labelModal">Texto:</label>
        <input type="text" class="inputModalPostEdit" placeholder="Escribe aquí">
        <label class="labelModal">Coordenadas:</label>
        <input type="text" class="inputModalEdit" placeholder="Escribe aquí">
        <div class="divImgModal"> 
          <label class="labelModal">Imagen:</label>
          <input type="file" class="buttonModalImg" id="buttonModalImgEdit"></input>
        </div>
        <label class="labelErrorsModal" id="labelErrorsModal"></label>
        <br>
        <button type="button" class="buttonModalPublish" id="buttonModalPublishEdit"> Editar Publicacion</button>
        </form>`;
        windowsModal.showModal();
        windowsModal.style.display = 'block';
        windowsModal.style.display = 'flex';
        const btnCloseEdit = loginDiv.querySelector('#divModal').querySelector('#closeModal'); // variable que almacena el boton de cerrar la ventana modal
        const btnPublishEdit = loginDiv.querySelector('#divModal').querySelector('#buttonModalPublishEdit');

        const inputModalPostEdit = windowsModal.querySelector('.formulario').querySelector('.inputModalPostEdit');
        const coordenadasEdit = windowsModal.querySelector('.formulario').querySelector('.inputModalEdit');
        const selecImgEdit = windowsModal.querySelector('.formulario').querySelector('.divImgModal').querySelector('#buttonModalImgEdit');

        const forEditPublication = doc.data();
        inputModalPostEdit.value = forEditPublication.post;
        coordenadasEdit.value = forEditPublication.coords;
        selecImgEdit.value = forEditPublication.imagen;
        idPublished = doc.id;
        console.log(idPublished);

        btnPublishEdit.addEventListener('click', () => {
          const newInputPost = windowsModal.querySelector('.formulario').querySelector('.inputModalPostEdit').value;
          const newCoords = windowsModal.querySelector('.formulario').querySelector('.inputModalEdit').value;
          const newImg = windowsModal.querySelector('.formulario').querySelector('.divImgModal').querySelector('#buttonModalImgEdit').value;
          upDatePost(idPublished, { post: newInputPost, coords: newCoords, imagen: newImg });
          windowsModal.close();
          windowsModal.style.display = 'none';
          console.log(inputModalPostEdit, coordenadasEdit, selecImgEdit);
        });

        btnCloseEdit.addEventListener('click', () => {
          windowsModal.close();
          windowsModal.style.display = 'none';
        });
      }));
    });
  });

  return loginDiv;
};
