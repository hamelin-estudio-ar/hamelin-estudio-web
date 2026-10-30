# Hamelin Estudio – Landing

Sitio estático (HTML + CSS + JS modular), sin build.

## Estructura
```
index.html
css/styles.css
js/main.js              # menú, animaciones, formulario
js/firebase-config.js   # config de Firebase (completar)
assets/img/logo.jpg
firestore.rules         # reglas: solo crear en "consultas"
```

## Ejecutar en local
Los módulos ES requieren servidor HTTP (no abrir con doble clic):
```
python -m http.server 5500
```
o la extensión *Live Server* de VS Code. Abrir http://localhost:5500

## Formulario (Firestore)
1. Crear proyecto en Firebase y habilitar Firestore.
2. Registrar app web y copiar la config en `js/firebase-config.js`.
3. Publicar `firestore.rules`.
4. Las consultas se guardan en la colección `consultas`.

## Pendiente
- URLs reales de LinkedIn y GitHub en `index.html` (en `RedesSociales.txt` figuraba un email).
- Deploy sugerido: Firebase Hosting, apuntando hamelinestudio.com.ar.
