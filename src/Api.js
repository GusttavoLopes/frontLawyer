import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'http://192.168.1.9:8000/api';

export default {
    checkToken: async (token) => {
        const req = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();
        return json;
    },
    signIn: async (email, password) => {
        const req = await fetch(`${BASE_API}/auth/login`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const json = await req.json();
        return json;
    },
    signUp: async (name, email, password) => {
        const req = await fetch(`${BASE_API}/user`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await req.json();
        return json;
    },
    logout: async () => {
        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/auth/logout`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();
        return json;
    },
    getLawyers: async (lat=null, lng=null, address=null) => {
        const token = await AsyncStorage.getItem('token');

        console.log("LAT", lat);
        console.log("LNG", lng);
        console.log("ADDRESS", address);

        const req = await fetch(`${BASE_API}/lawyers?token=${token}&lat=${lat}&lng=${lng}&address=${address}`);
        const json = await req.json();
        return json;
    },
    getLawyer: async (id) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/lawyer/${id}?token=${token}`);
        console.log(json);
        const json = await req.json();
        return json;
    },
    setFavorite: async (lawyerId) => {
        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/user/favotited`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token, lawyer:lawyerId})
        });
        const json = await req.json();
        return json;
    },
    setAppointment: async (userId,
        service,
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedHour) => {
        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/lawyer/user/appointment`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                id: userId,
                service,
                year: selectedYear,
                month: selectedMonth,
                day: selectedDay,
                hour: selectedHour
            })
        });
        const json = await req.json();
        return json;
    },
    search: async (lawyerName) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/search?$q=${lawyerName}token=${token}`);
        const json = await req.json();
        return json;
    },
    getFavorites: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/favorites?token=${token}`);
        const json = await req.json();
        return json;
    },
    getAppointments: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/appointments?token=${token}`);
        const json = await req.json();
        return json;
    },
};