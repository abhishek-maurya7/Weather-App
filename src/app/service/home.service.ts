import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  apiBaseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${environment.openWeatherApiKey}`;

  fetchWeather(city: string) {
    const url = `${this.apiBaseUrl}&q=${city}`;
    return this.http.get(url);
  }

  fetchWeatherByCoordinates(latitude: number, longitude: number) {
    const url = `${this.apiBaseUrl}&lat=${latitude}&lon=${longitude}`;
    return this.http.get(url);
  }
}
