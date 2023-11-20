//https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=fa7f8c003a57394237cec3764afce20d

let estados = []

async function lerDados(url){
    let response = await fetch(url)
    let json = await response.json()
    estados = json.estados
}

lerDados('dados/temp.json')

document.querySelector('#btn').addEventListener('click', ()=>{
    let pesq = document.querySelector('#pesq').value.toUpperCase() 
    pesquisar(pesq)
})

function pesquisar(pesq){
    for(let estado of estados){
        console.log(estado.name)
        if(estado.name.toUpperCase() == pesq){
            estrutura(estado)
        }
    }
}

function estrutura(estado){
    let res = document.querySelector('#res')
    let status = ''
    let img = ''
    if(estado.weather[0].main.toLowerCase() == 'clouds'){
        status = estado.weather[0].main.toLowerCase()
        img = '<img src="img/overcast.png">'
        console.log(status)
    }else if(estado.weather[0].main.toLowerCase() == 'thunderstorm'){
        status = estado.weather[0].main.toLowerCase()
        img = '<img src="img/heavy-rain.png">'
        console.log(status)
    }else if(estado.weather[0].main.toLowerCase() == 'clear'){
        status = estado.weather[0].main.toLowerCase()
        img = '<img src="img/clear-sky.png">'
        console.log(status)
    }else if(estado.weather[0].main.toLowerCase() == 'smoke'){
        status = estado.weather[0].main.toLowerCase()
        img = '<img src="img/fog.png">'
        console.log(status)
    }
    celsius()
    res.innerHTML = `
        <article class='${status}'>
            <h1>${celsius(estado.main.temp)}</h1>
            ${img}
            <h4>${estado.weather[0].description}</h4>
            <div class='local'>
                <i class="fa-solid fa-location-dot"></i>
                <p>${estado.name}</p>
            </div>
            <p>Máximo ${celsius(estado.main.temp_max)}</p>
            <p>Mínima ${celsius(estado.main.temp_min)}</p>
        </article>
        `
}

function celsius(temp){
    let c = temp - 273.15
    return `${c.toFixed(0)}°`
}




