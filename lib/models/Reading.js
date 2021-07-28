import pool from '../utils/pool.js';

export default class Reading {
    id;
    spread;
    cards;

    constructor(row) {
        this.id = row.id;
        this.spread = row.spread;
        this.cards = row.cards;
    }
}
