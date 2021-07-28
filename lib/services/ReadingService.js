const { request } = require('express');
const Reading = require('../models/Reading.js');

module.exports = class ReadingService {
    
  static async generateReading(value) {
    let reading = '';
    for(let i = 0; i < Number(value); i++) {
      const data = await request.get('https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=1');
      const mungedInfo = data.cards[0].name;
      reading = reading + ` ${mungedInfo}`;
    }
    const finalReading = await Reading.insert({ spread: value, cards: reading });

    return finalReading;
  }


};
