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
}
