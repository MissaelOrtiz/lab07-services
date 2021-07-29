import request from 'superagent';
import Reading from '../models/Reading.js';

export default class ReadingService {
    
  static async generateReading({ spread }) {
    let reading = '';
    for(let i = 0; i < Number(spread); i++) {
      const data = await request.get('https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=1');
      const mungedInfo = data.body.cards[0].name;
      reading = reading + ` ${mungedInfo}`;
    }
    const finalReading = await Reading.insert({ spread, cards: reading });

    return finalReading;
  }

  static async updateReading(id, newNum) {
    let reading = '';
    for(let i = 0; i < Number(newNum); i++) {
      const data = await request.get('https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=1');
      const mungedInfo = data.body.cards[0].name;
      reading = reading + ` ${mungedInfo}`;
    }
    const finalReading = await Reading.updateById(id, { spread: newNum, cards: reading });
    // console.log('reading--------', reading, newNum);
    return finalReading;
  }
}
