# React-Web Api-Nasa
<a target="_blank" rel="noopener noreferrer" href="https://react-api-nasa.netlify.app/"><img src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1658752952/API-GA/logoCyE_bisma5.png" alt="logo CyE" style="max-width: 100%;border-radius:1rem;margin-top:1rem"></a>
## Final Course Project. Consuming several Nasa APIs.
----------------------------------------------------------------
### Thank you very much to the Adecco Foundation for believing in us.
<a target="_blank" rel="noopener noreferrer" href="https://fundacionadecco.org/becas-y-ayudas/senior/"><img src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1657192729/API-GA/adecco_o0ddcs.png" alt="Fundación Adecco" style="max-width: 40%;border-radius:1rem;margin-top:1rem"></a>
### And thanks also to the technical training deployed by General Assembly

<a target="_blank" rel="noopener noreferrer" href="https://generalassemb.ly/"><img src="https://pataruco.github.io/ga-assets/assets/logos/ga.svg" alt="General Assembly" style="max-width: 10%;"></a>


 - This article is written in English but you can see its version in [Spanish](README-es-ES.md)
 - ## Demo
- If you want to see the demo of this project deployed, you can visit [API-NASA project Demo](https://react-api-nasa.netlify.app/)

- We have decided to work as a team as a practice of collaborative work in Web development.
- project by [Claudia Muñoz García](mailto:claudia.munozgarcia@gmail.com?subject=[GitHub]%20Source%20Han%20Sans) y [Eduardo Cabrera Blázquez](mailto:ecabrerablazquez@gmail.com?subject=[GitHub]%20Source%20Han%20Sans)
- If you want to see the principal initial wireframe of this project, you see here [INITIAL WIREFRAME](https://res.cloudinary.com/dquxfl0fe/image/upload/v1658301121/API-GA/dise%C3%B1o_zvjwlz.png)
- First meeting between Claudia and Eduardo [HOW TO START](https://res.cloudinary.com/dquxfl0fe/image/upload/v1655767968/API-GA/primeras_ideas_gwigsq.png)
- Project Considerations and Acknowledgements in PDF format [PDF](https://res.cloudinary.com/dquxfl0fe/image/upload/v1658782733/API-GA/guion_proyecto_final_en-GB_ymdtp9.pdf)


   
<div style="display:flex;border:solid 3px;border-color:white;border-radius:2rem;width:fit-content;margin:2rem;background-color:rgb(60, 108, 163)">
<a target="_blank" rel="noopener noreferrer" href="https://api.nasa.gov/"><img src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1657194000/API-GA/nasa-logo_w5ebmi.png" alt="Logo Nasa" style="max-width: 60%; margin-top:1rem;margin-left:3rem"></a>

<p style="color:white;margin-top:5rem;margin-right:5rem">Click on the Nasa logo to learn more about APIs</p>
</div>












## Hooks and technologies used in this React Bundle

- Hooks used:  `useState`, `useReducer`, `useRef`, `useEffects`

- As appropriate, we have used Frameworks or libraries like `MapBox`, `Bootstrap`, `Animate.js`, `@material-ui/core`, o `react-zoom-pan-pinch`, `chart.js`, `firebase-Firestore`
- We have used our own CDN (Cloudinary) to host the project's media, although we also have access to our own Google Cloud Storage.
- We have used Screenpresso software as our preferred digital tool for creating and editing our wireframes.
--------------------------------------
--------------------------------------
> In this exercise, the API-NASA of the astronomical image of the day is called.
> It will also be possible to visualize on maps both the current position 
> of the international station as well as the API that Nasa has
> Nasa to record locations of known meteorites.
--------------------------------------
--------------------------------------
>One of the challenges we have had to face relates to the paradigm shift we had been accustomed to
>Vanilla Javascript programming. We, like many React developers, have had to move from class-based components 
>to function-based components with React hooks. 
>to function components with React hooks we have had to come to terms with the fact that state updates using objects are no longer automatically merged. 

## Example Apod Json Api-Nasa
![obj Apod](https://res.cloudinary.com/dquxfl0fe/image/upload/v1658221607/API-GA/2022-07-05_21h17_03_y8ogpw.png)





### - Color Theory

   It is important to know a little about the psychology of color, and above all:
    
    - Search for balanced colors: to achieve this, we respect the chromatic range of the chosen palette.
    - We have tried not to use or abuse other colors, so as not to transmit a feeling of disorder..

   ![paleta](https://res.cloudinary.com/dquxfl0fe/image/upload/v1657994150/API-GA/paleta_sdyfk5.png)


   
=======
Proyect Web development 2022
>>>>>>> Code Routes
```const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="Main" element={<Main />} />
      <Route path="Meteors" element={<Meteors />} />
      <Route path="MapsMeteors" element={<MapsMeteors />} />
      <Route path="Iss" element={<Iss/>} />
      <Route path="MapsEstacionIss" element={<MapsEstacionIss />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  </BrowserRouter>,
);

reportWebVitals();

```
## several unit tests performed
![unit test](https://res.cloudinary.com/dquxfl0fe/image/upload/v1658485450/API-GA/prueba_unitaria3_bfrycc.png)
>>>>>>> Private and protected Mapbox password (If you Fork the project you need to get your own)
```
mapboxgl.accessToken = process.env.REACT_APP_API_KEY;
```
## Snapshot of the main url
![obj Apod](https://res.cloudinary.com/dquxfl0fe/image/upload/v1658303540/API-GA/main_clmcmy.png)

## Sample International Station Route (Minimum viable product)
![obj Apod](https://res.cloudinary.com/dquxfl0fe/image/upload/v1658071685/API-GA/iis01_ihytaj.png)

## Snapshot of the Meteors Url (Minimum viable product)
![obj Apod](https://res.cloudinary.com/dquxfl0fe/image/upload/v1658304213/API-GA/meteors-page_hgad0n.png)

## Snapshot of the fire registration Url  (Minimum viable product)
![obj Apod](https://res.cloudinary.com/dquxfl0fe/image/upload/v1661325119/API-GA/fires_zezb6b.png)

## Snapshot of the favorite data hosted in Google Cloud
![obj Apod](https://res.cloudinary.com/dquxfl0fe/image/upload/v1663324346/API-GA/react-firebase-listas_tkqdnc.png)

## snapshot of visitor logs and statistics (chart.js component)
![obj Apod](https://res.cloudinary.com/dquxfl0fe/image/upload/v1663500031/API-GA/visitas-sp_hejp0h.png)

## Commits and time employed
![obj Apod](https://res.cloudinary.com/dquxfl0fe/image/upload/v1663502433/API-GA/estadistica_rmtlxu.png)

## audio of presentation in english
https://user-images.githubusercontent.com/107960254/191373866-a30a0d12-bc4c-4ce7-bade-b08db6f73f85.mov


