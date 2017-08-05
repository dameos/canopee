# Canopee 

By: David Medina Ospina

# 1. Descripción de la aplicación

Aplicación web para el manejo de canciones(soundCloud). 

# 2. Análisis

## 2.1 Requisitos funcionales: 
1. Añadir una nueva canción
2. Buscar canción por nombre 
3. Listar todas las canciones subidas por el usuario logeado actualmente
4. Listar todas las canciones públicas en la página principal
5. Poder editar los campos de las canciones subidas por el usuario logeado actualmente 
6. Poder borrar canciones subidas por el usuario logeado actulmente logeado

## 2.2 Definición de tecnología de desarrollo y ejecución de la aplicación:
* Lenguaje de programación: Javascript 
* Framework web backend: NodeJS - Express
* Framework web frontend: Template HTML(ejs)
* Base de datos: MongoDB
* Web app server: NodeJS
* Web server: NGINX

# 3. Diseño: 

## 3.1 Modelo de datos:

    user: 

    {
        username: String, 
        password: String,
        email: String,
        create_date: Date     
    }

    song: 

    {
        songName: String,
        songAuthor: String,
        songDurarion: String,
        songImageUrl: String,
        songOwner: String,
        songPrivate: Boolean,
        create_date: Date
    }

## 3.2 Servicios Web 

    /* Descripción: Realiza la búsqueda de todas las canciones
       Método: GET
       URI: /songs/allSongs
       Datos Request: No aplica
       Datos Response: Vista a render: 'songs', Datos: {title: Songs, songs: songs} 
    */

    /* Descripción: Añade una canción a la base de datos
       Método: POST
       URI: /songs/addSong
       Datos Request: {songName, songAuthor, songDuration, songImageUrl}
       Datos Response: Vista a render: 'songs', Datos: {title: Songs, songs:songs} 
    */

    /* Descripción: Renderiza el formularío para añadir una nueva canción 
       Método: GET
       URI: /songs/addSong
       Datos Request: No aplica
       Datos Response: Vista a render: 'addSong', Datos: {} 
    */

    /* Descripción: Realiza la búsqueda de una canción por su nombre
       Método: POST
       URI: /songs/getSongByName
       Datos Request: {songName}
       Datos Response: Vista a render: 'songs', Datos: {title: 'Songs', songs:songs} 
    */

    /* Descripción: Trae todas las caciones añadidas por el usuario actualmente logeado
       Método: GET
       URI: /songs/mySongs
       Datos Request: No aplica
       Datos Response: Vista a render: 'songs', Datos: {title: 'My songs', songs:songs} 
    */

    /* Descripción: Borra una cancíon por su ID y hace refresh a 'My songs'
       Método: GET
       URI: /songs/deleteSong/:id
       Datos Request: No aplica
       Datos Response: Vista a render: 'songs', Datos: {title: 'My songs', songs:songs} 
    */

    /* Descripción: Renderiza el formulario para editar una canción
       Método: GET
       URI: /songs/editSong/:id
       Datos Request: No aplica
       Datos Response: Vista a render: 'editSong', Datos: {id:id} 
    */

    /* Descripción Edita una canción especifica y hace refresh a 'My songs'
       Método: POST
       URI: /songs/deleteSong/:id
       Datos Request: {songName, songAuthor, songDuration, songImageUlr}
       Datos Response: Vista a render: 'songs', Datos: {title: 'My songs', songs:songs} 
    */

    


    
