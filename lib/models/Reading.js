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

    static async insert({spread, cards}) {
        const { rows } = await pool.query(
            'INSERT INTO readings (spread, cards) VALUES ($1, $2) RETURNING *', [spread, cards]
        )

        return new Reading(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM readings WHERE id=$1', [id]);

        return new Reading(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM readings');

        return rows.map((row) => new Reading(row));
    }

    static async updateById(id , {spread, cards}) {
        const existingReading = await Reading.getById(id);
        const newSpread = spread ?? existingReading.spread;
        const newCards = cards ?? existingReading.cards;
        
        const { rows } = await pool.query('UPDATE readings SET spread=$1, cards=$2 WHERE id=$3 RETURNING *',
        [newSpread, newCards, id]);
        return new Reading(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query('DELETE FROM readings WHERE id=$1 RETURNING *', [id]);

        return new Reading(rows[0]);
    }
}
