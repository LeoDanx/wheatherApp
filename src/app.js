const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))


const app = express();

//Definiendo paths para Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');//definiendo el path para views
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs');//iniciar o establecer handlebars
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('',(req,res)=>{

    res.render('index',{
        title: 'Weather App', 
        name: 'Angel Herrera'
    });
       
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'Acerca de mi',
        name: 'Angel Herrera'
    })
});

app.get('/help',(req,res)=>{
    
    res.render('help',{
        title: 'Página de ayuda',
        name: 'Angel Herrera',
        fecha: 'Julio 22'
    })

})


// app.get('', (req,res) => {//la funcion es el handler; el request es la peticion, la el resp, es la respuesta

//    // res.send('Hola express');
//     res.send('<h1>Weather</h1>');


// });//el primer parámetro string, es la ruta solicitada

// app.get('/help', (req, res) =>{

//     //res.send('Pagina de ayuda');
//     res.send([{
//         name: 'Angel',
//         age:25
//     },{
//         name: 'Jj',
//         age:24
//     }]);

//     res.send()
// });


// app.get('/about', (req, res)=> {

//     res.send('<h1>Acerca de WeatherApp</h1>');
// });

app.get('/weather', (req, res)=> {

    
    if(!req.query.address){
        return res.send({
            error: 'Teclee una dirección válida.'
        })
    }else{

        geocode(req.query.address,(error, {latitude, longitude, location}={}) => {

            if(error){
            
                return res.send({error})
            }
            
            // console.log('Error',error);
            // console.log('Data',data);

            forecast(latitude,longitude,(error, forecastData)=>{

                if(error){
                    return res.send({error});
                }
                // console.log(location);
                // console.log(forecastData);
                res.send({
                    location: location,
                    forecast: forecastData,
                    adress: req.query.address
                })

            });

        });

    }
    
   
});

app.get('/products', (req, res) => {
    
    if(!req.query.search){
        return res.send({
            error: 'Se requiere un término de búsqueda'
        })
    }
    //req.query();
    res.send({
        products: []
    });
});

app.get('/help/*', (req,res) => {

    res.render('error',{
        title: '404',
        name: 'Angel Herrera',
        errorMessage: 'No se encuentra el articulo solicitado'
    })
    
});

app.get('*', (req,res) => {

    res.render('error',{

        title: '404',
        name: 'Angel Herrera',
        errorMessage: 'Pagina no encontrada'

    })

});

app.listen(3000, () => {
    console.log('El servidor esta corriendo en el puerto 3000');
});