<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title class="headline">Weather forecast</v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <v-responsive class="mx-auto" max-width="344">
        <v-text-field v-model="city" name="City" label="City"></v-text-field>
    </v-responsive>
    <v-row>
        <v-col cols="12" class="text-center">
            <v-btn @click="getForecast" color="primary">Get forecast</v-btn>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" v-if="weather">
            <v-card>
                <v-card-title>Weather in {{ city }}</v-card-title>
                <v-card-text>
                    <v-list>
                        <v-list-item v-for="(day, index) in weather" :key="index">
                            <v-list-item-content>
                                <v-list-item-title>{{ formatDate(day.date) }}</v-list-item-title>
                                <v-list-item-subtitle>Temperature: {{ day.temperature }}°C</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            city: '',
            weather: null,
        };
    },
    methods: {
        async getForecast() {
            if (!this.city) {
                alert('Please enter a city name');
                return;
            }

            try {
                const geocodeResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${this.city}`);
                if (geocodeResponse.data.results && geocodeResponse.data.results.length > 0) {
                    const { latitude, longitude } = geocodeResponse.data.results[0];
                    const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`);
                    this.weather = weatherResponse.data.daily.time.map((date, index) => ({
                        date,
                        temperature: `Max: ${weatherResponse.data.daily.temperature_2m_max[index]}°C / Min: ${weatherResponse.data.daily.temperature_2m_min[index]}`,
                    }));
                } else {
                    alert('City not found');
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
                alert('Failed to fetch weather data');
            }
        },
        formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString(undefined, options);
        },
    },
};
</script>
