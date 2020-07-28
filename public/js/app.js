
/*fetch('http://puzzle.mead.io/puzzle').then((response) => {

    response.json().then((data)=>{

        console.log(data);

    })

 });*/

 

 const weather= document.querySelector('form');
 const search = document.querySelector('input');
 const message1 = document.querySelector('#message-one');
 const message2 = document.querySelector('#message-two');

 //message1.textContent = 'Aqui mensaje uno'; 

 weather.addEventListener('submit', (e) =>{

    e.preventDefault();
    const location= search.value;
    //console.log(location);

    message1.textContent = "Loading...";
    message2.textContent = '';

//     fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
 
//     response.json().then((data)=>{

//         if(data.error){
            
//             console.log(data.error);
//             message1.textContent = data.error;
            

//         }else{
//             message1.textContent = data.location; //`Location: ${data.location}. Forecast: ${data.forecast}`;
//             message2.textContent = data.forecast; 
//             //console.log(data.location);
//             // console.log(data.forecast);
//         }

//     });
        

//  });

fetch(`/weather?address=${location}`).then((response) => {
 
    response.json().then((data)=>{

        if(data.error){
            
            console.log(data.error);
            message1.textContent = data.error;
            

        }else{
            message1.textContent = data.location; //`Location: ${data.location}. Forecast: ${data.forecast}`;
            message2.textContent = data.forecast; 
            //console.log(data.location);
            // console.log(data.forecast);
        }

    });
        

 });
    

 })