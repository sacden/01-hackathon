import { Module } from "../core/module";
import menu from "../app";
import {Toast} from "bootstrap"

export class WeatherModule extends Module {
  constructor(type, text) {
    super(type, text);

    this.city = text
    this.lat = 55.7522;//Moscow lat by default
    this.lng = 37.6156;//Moscow lng by default
    this.key = 'c7616da4b68205c2f3ae73df2c31d177',
    this.base = 'http://api.openweathermap.org/data/2.5/'
    this.url = `${this.base}weather?q=${this.city}&units=metric&appid=${this.key}`//get weather by city name 
    //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key} //get weather by lat lng
  }


    getCityLatLng(){
        const key ='AIzaSyD6hP4CU7i2XBzbvWhSz3fa3XHV7iUBazA' //
        if(!document.body.innerHTML.includes(`<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyD6hP4CU7i2XBzbvWhSz3fa3XHV7iUBazA"></script>`)){
            // let myScriptElement= document.innerHTML +=( 
            //     `<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>`
            //     )
            let myScriptElement= document.createElement('script')
            myScriptElement.type  ="text/javascript"
            myScriptElement.src = `http://maps.googleapis.com/maps/api/js?key=${key}`
            document.body.appendChild(myScriptElement);
        }

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
        }else{
            //if navigator.geolocation failed show Moscow weather
            sendRequest(this.lat,this.lng);
        } 

        //Get the latitude and the longitude;
        function successFunction(position) {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            console.log('lat',position.coords.latitude)
            console.log('lng',position.coords.longitude)
            sendRequest(lat, lng);
        }

        function errorFunction(){
            alert("Geocoder failed");
            console.log("Geocoder failed")
            sendRequest(this.lat,this.lng);
        }
        
        ///end getCityLatLng function
    }

  trigger(){
    this.getCityLatLng();
    //this.sendRequest();
    this.toHTML();
  }

  addItemInMenuList() {
    menu.add(
      `показать погоду в моем городе`,
      this.trigger.bind(this)
    );
  }


}

function setWeather(result, description,iconUrl, city, country){
    if(!document.head.innerHTML.includes('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">'))
    document.head.innerHTML +=(`
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    `)
    
    if(!document.querySelector('.toast')){
        document.body.innerHTML =(    
            `<div autohide="false" class="top-0 end-0 p-3" style="position: absolute; top: 3rem; right: 0;z-index: 11;autohide: false;">
                <div id="toastWeather" class="toast" role="alert" aria-live="assertive" aria-atomic="true" autohide="false" style="autohide: false;">
                    <div class="toast-header" style="margin-left: 10%;">
                    <img src=${iconUrl} class="rounded me-2" width="50px" alt="..." >
                    <strong class="me-auto" style="font-size:25px">${city}<sup style="color:white;background:orange;border-radius: 15px;padding: 0.1em 0.3em;">${country}</sup></strong>
                    
                    <!--small class="text-muted" style="font-weight: bold;">${description}</!--small-->
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body" style="font-weight: bold;font-size:20px;margin-left: 10%;" style="display: block">
                    ${result}°C
                    <small class="text-muted" style="font-weight: bold;margin-left: 30%;">${description}</small>
                    </div>
                </div>
            </div>`)+document.body.innerHTML
            // document.body.innerHTML +=( 
            // `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>`
            // );


    }

        var toastWeather = document.getElementById('toastWeather')
        var toast = new Toast(toastWeather)
        toast.show()

  }

const  sendRequest = async (lat, lng) => {
    try {
        const key = 'c7616da4b68205c2f3ae73df2c31d177'
        const base = 'http://api.openweathermap.org/data/2.5/'
        //this.url = `${this.base}weather?q=${this.city}&units=metric&appid=${this.key}`// by city name
        const url = `${base}weather?lat=${lat}&lon=${lng}&appid=${key}&units=metric`

      const response = await fetch(url)
        .then(async res => {
            const resJson = await res.json()
            let  temp =  resJson.main.temp
            const description = resJson.weather[0].description
            const icon = resJson.weather[0].icon
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
            const name = resJson.name
            const country = resJson.sys.country
            console.log('temp',temp)
            console.log('resJson by latlang',resJson);
            if(temp>100){
                temp =  temp-272.15 //kelvin
              // temp =  (5/9) * (temp-32) //farenheit
            }
            setWeather(temp, description, iconUrl, name, country)
        }) 
    } catch (error) {
      console.log("error", error);
    }
  };


export const weatherModule = new WeatherModule("type", 'Moscow');