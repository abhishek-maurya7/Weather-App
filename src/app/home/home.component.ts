import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { error } from 'console';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService) { }

  city: string = '';
  weatherInfo: any;

  ngOnInit(): void {
    this.fetchUserLocation();
  }

  banner!: string;
  setImage() {
    if (this.weatherInfo.weather[0].icon.includes('n')) {
      const randomNumber = Math.floor(Math.random() * 5) + 1;
      this.banner = `../../assets/night${randomNumber}.jpg`; // Replace 'night-image.jpg' with your night image file name
    } else {
      const randomNumber = Math.floor(Math.random() * 4) + 1;
      this.banner = `../../assets/day${randomNumber}.jpg`; // Replace 'day-image.jpg' with your day image file name
    }
  }
  fetchUserLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          this.homeService.fetchWeatherByCoordinates(latitude, longitude).subscribe({
            next: (response) => {
              this.weatherInfo = response;
              this.setImage();
            }
          });
        },
        error => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  errorMessage!: string
  fetchWeatherByCity() {
    this.homeService.fetchWeather(this.city).subscribe({
      next: (response) => {
        this.weatherInfo = response;
        this.setImage();
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
    });
  }

  formatTime(timestamp: number): string {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    return date.toLocaleTimeString();
  }

  convertTemp(tempKalvin: number): number {
    return Math.floor(tempKalvin - 273.15)
  }
}
