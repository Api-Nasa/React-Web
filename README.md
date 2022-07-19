# React-Web Api-Nasa
## Final Course Project with General Assambly to consume several Nasa APIs

<a target="_blank" rel="noopener noreferrer" href="https://pataruco.github.io/ga-assets/assets/logos/ga.svg"><img src="https://pataruco.github.io/ga-assets/assets/logos/ga.svg" alt="" style="max-width: 10%;"></a>
 - *This article can also be read in [Spanish](README-es-ES.md).*
 - ## Demo
- If you want to see the demo of this project deployed, you can visit [Demo of the proyect API-NASA](https://react-api-nasa.netlify.app/)
- ![](https://a.slack-edge.com/production-standard-emoji-assets/13.0/google-medium/1fac2@2x.png)
  We have decided to work as a team as a practice of collaborative work in Web development.
  - project developed by [Claudia Muñoz García](mailto:claudia.munozgarcia@gmail.com?subject=[GitHub]%20Source%20Han%20Sans) y [Eduardo Cabrera Blázquez](mailto:ecabrerablazquez@gmail.com?subject=[GitHub]%20Source%20Han%20Sans)


![Logo Nasa](https://res.cloudinary.com/dquxfl0fe/image/upload/v1657194000/API-GA/nasa-logo_w5ebmi.png)















## Hooks and technologies used in React Bundle

- Hooks used:  `usestate`, `usereducer`, `useref`, `useeffects`, 

- As appropriate, we have used Frameworks or libraries like `MapBox`, `Bootstrap`, `Animate.js`, `@material-ui/core`, o `react-zoom-pan-pinch`
--------------------------------------
--------------------------------------
> In this exercise, the API-NASA of the astronomical image of the day is called.
> It will also be possible to visualize on maps both the current position 
> of the international station as well as the API that Nasa has
> Nasa to record locations of known meteorites.
--------------------------------------
--------------------------------------
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

>>>>>>> Private and protected Mapbox password (If you Fork the project you need to get your own)
```
mapboxgl.accessToken = process.env.REACT_APP_API_KEY;
```