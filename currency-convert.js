const axios = require('axios');

// const getExchangeRate = (from,to)=>{
//     return axios.get('http://data.fixer.io/api/latest?access_key=5886875f2e6814b0843954b7e66fef63')
//     .then((res)=>{
//         const euro = 1/res.data.rates[from];
//         const rate = euro * res.data.rates[to];
//         return rate;
//     });
// };

const getExchangeRate = async (from,to)=>{
    try{
        const res = await axios.get('http://data.fixer.io/api/latest?access_key=5886875f2e6814b0843954b7e66fef63');
        const euro = 1/res.data.rates[from];
        const rate = euro * res.data.rates[to];

        if(isNaN(rate)){
            throw new Error();
        }

        return rate;
    }catch(e){
        throw new Error(`Unable to get exchange rate for ${from} ans ${to}`);
    }
};

const getCountries = async (code)=>{
    try{
        const res = await axios.get(`https://restcountries.eu/rest/v2/currency/${code}`);
        return res.data.map((country)=>country.name);
    }catch(e){
        throw new Error(`Unable to get countries that use ${code}`);
    }
};

const convertCurrency = async (from,to,amount)=>{
    const rate = await getExchangeRate(from,to);
    const countries = await getCountries(to);
    const convertedAmount = (amount * rate).toFixed(2);
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can use it in the following countries : ${countries}`;
};

// getExchangeRate('USD','CAD').then((rate)=>{
//     console.log(rate);
// });

// getCountries('EUR').then((countries)=>{
//     console.log(countries);
// });

convertCurrency('USD', 'EUR', 20)
.then((message)=>console.log(message))
.catch((e)=>console.log(e));