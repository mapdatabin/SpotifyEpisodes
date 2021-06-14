/*
https://developer.spotify.com/console/get-show-episodes/?id=&market=&limit=&offset=
*/

let bearer_token =
"BQDuP1S-q3mpx4FxE_vWl_tTIj1mO-eMlpRUPtz7KlVi_8lI_hsTWBHD_Ax5n60ErdFLImY3-wcKokM1g0IPMTfry3fKuFINQxi3ukJr2lQFwjnf7oNgjKAymOb21AoPfh-lcHGZL8sQWsh8kqK5X67T86FljUlGm9VY0PNRTsfjvC0npmITEMfOtqzLsl-lTrMEnnuDt-p-M52ONLl23Kn5EVcnI-QPaHtGQ3KVkyFBG67QW9g1FHIO-o2rRHDX28OOAb0XeCFnzKsh-pFG6-JN-CVfeunC9ItYUEyxXifFlHVx";
let url = "https://api.spotify.com/v1/shows";
let bearer = "Bearer " + bearer_token;

function fetch_featured(){
    let show_id = "5CfCWKI5pZ28U0uOzXkDHe";
    fetch(url + "?ids=" + show_id + "&market=US", {
        method:"GET",
        headers:{
            'Authorization': bearer,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((data)=>{return data.json()})
    // .then(console.log)
    .then((data)=>{
        let show = data.shows[0]
        let featured_html = `
            <div class = 'featured'>
                <img src='${show.images[1].url}' />
                <div>
                    <h2>${show.name}</h2>
                    <h4>${show.description}</h4>
                    <h3>Don't forget to listen to today's episode!</h3>
                    <button>Listen now</button>
                </div>
            </div>
        `
        document.getElementById("featured").innerHTML = featured_html;
    })
    .catch(console.log)
}

function fetch_latest(){
    let show_id = "5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ";
    fetch(url + "?ids=" + show_id + "&market=US", {
        method:"GET",
        headers:{
            'Authorization': bearer,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((data)=>{return data.json()})
    .then((data)=>{
        data.shows.forEach(show => {
            let show_html = `
            <div class='show' onclick='location.href = "show.html?id=${show.id}"'>
                <img src='${show.images[1].url}' />
                <div>
                    <h4>${show.name}</h4>
                    <h5>${show.publisher}</h5>
                </div>
            </div>
           `
            document.getElementById("shows").innerHTML += show_html;
        });

    })
    .catch(console.log)
}

function get_show(id){
    fetch(url + "/" + id + "?market=US", {
        method:"GET",
        headers:{
            'Authorization': bearer,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((data)=>{return data.json()})
    .then((data)=>{
        let header_html = `
            
            <img src='${data.images[1].url}' />
            <div>
                <p>PODCAST</p>
                <h2>${data.name}</h2>
                <h5>${data.publisher}</h5>
                
            </div>
            
        `
        document.getElementById("header").innerHTML = header_html;
    })
    .catch(console.log)
}

function get_episodes(id){
    fetch(url + "/" + id + "/episodes?market=US", {
        method:"GET",
        headers:{
            'Authorization': bearer,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })   
    .then((data)=>{return data.json()})
    .then((data)=>{
        data.items.forEach(episode => {
            let episode_html = `
            
                <div class="episode">

                    <img src="${episode.images[1].url}" />

                    <div class="episode__details">
                        <h2>${episode.name}</h2>
                    </div>
                        
                    <div class="audio">
                        <div class="play__button">
                            <audio src="${episode.audio_preview_url}"controls></audio>
                        </div>
                        <p>Preview</p>    
                    </div>
                    
                </div>
            `
            document.getElementById('episodes').innerHTML += episode_html;
        });
    })
}

function fetch_all(){
    fetch_featured();
    fetch_latest();
}

