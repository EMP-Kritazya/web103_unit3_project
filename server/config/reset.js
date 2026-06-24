// load env vars BEFORE database.js runs (it reads process.env when the pool is created)
import 'dotenv/config'
import { pool } from './database.js'

// ---------------------------------------------------------------------------
// LOCATIONS  (4 host stadiums of the 2026 FIFA World Cup)
// ids 1-4 line up with the four routes in App.jsx / the SVG venues in Locations.jsx
// ---------------------------------------------------------------------------
const locations = [
    {
        name: 'MetLife Stadium',
        image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800',
        address: '1 MetLife Stadium Dr',
        city: 'East Rutherford',
        state: 'NJ',
        zip: '07073'
    },
    {
        name: 'AT&T Stadium',
        image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800',
        address: '1 AT&T Way',
        city: 'Arlington',
        state: 'TX',
        zip: '76011'
    },
    {
        name: 'SoFi Stadium',
        image: 'https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=800',
        address: '1001 Stadium Dr',
        city: 'Inglewood',
        state: 'CA',
        zip: '90301'
    },
    {
        name: 'Hard Rock Stadium',
        image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800',
        address: '347 Don Shula Dr',
        city: 'Miami Gardens',
        state: 'FL',
        zip: '33056'
    }
]

// ---------------------------------------------------------------------------
// EVENTS  (FIFA World Cup 2026 matches, grouped by host stadium via location_id)
// ---------------------------------------------------------------------------
const matchImage = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800'

const events = [
    // MetLife Stadium (location_id 1) — incl. the Final
    { title: 'USA vs. Netherlands — Group Stage', date: '2026-06-25', time: '19:00', image: matchImage, location_id: 1 },
    { title: 'England vs. Croatia — Group Stage', date: '2026-06-27', time: '15:00', image: matchImage, location_id: 1 },
    { title: 'Round of 16 — Match 53', date: '2026-07-01', time: '18:00', image: matchImage, location_id: 1 },
    { title: 'FIFA World Cup Final', date: '2026-07-19', time: '15:00', image: matchImage, location_id: 1 },

    // AT&T Stadium (location_id 2) — incl. a Semifinal
    { title: 'Mexico vs. Japan — Group Stage', date: '2026-06-24', time: '17:00', image: matchImage, location_id: 2 },
    { title: 'Brazil vs. Switzerland — Group Stage', date: '2026-06-26', time: '20:00', image: matchImage, location_id: 2 },
    { title: 'Quarterfinal — Match 59', date: '2026-07-10', time: '19:00', image: matchImage, location_id: 2 },
    { title: 'Semifinal — Match 61', date: '2026-07-14', time: '19:00', image: matchImage, location_id: 2 },

    // SoFi Stadium (location_id 3)
    { title: 'Argentina vs. South Korea — Group Stage', date: '2026-06-25', time: '16:00', image: matchImage, location_id: 3 },
    { title: 'France vs. Senegal — Group Stage', date: '2026-06-28', time: '18:00', image: matchImage, location_id: 3 },
    { title: 'Round of 16 — Match 56', date: '2026-07-02', time: '17:00', image: matchImage, location_id: 3 },

    // Hard Rock Stadium (location_id 4) — incl. the Third-Place Playoff
    { title: 'Spain vs. Morocco — Group Stage', date: '2026-06-24', time: '20:00', image: matchImage, location_id: 4 },
    { title: 'Germany vs. Uruguay — Group Stage', date: '2026-06-27', time: '17:00', image: matchImage, location_id: 4 },
    { title: 'Quarterfinal — Match 60', date: '2026-07-11', time: '15:00', image: matchImage, location_id: 4 },
    { title: 'Third-Place Playoff', date: '2026-07-18', time: '15:00', image: matchImage, location_id: 4 }
]

// ---------------------------------------------------------------------------
// reset + seed
// ---------------------------------------------------------------------------
const createTables = async () => {
    // drop events first (it references locations) then recreate both
    const query = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image TEXT,
            address VARCHAR(255),
            city VARCHAR(255),
            state VARCHAR(2),
            zip VARCHAR(10)
        );

        CREATE TABLE events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date DATE,
            time TIME,
            image TEXT,
            location_id INTEGER REFERENCES locations(id)
        );
    `

    await pool.query(query)
    console.log('🎉 tables created')
}

const seedLocations = async () => {
    for (const location of locations) {
        const query = `
            INSERT INTO locations (name, image, address, city, state, zip)
            VALUES ($1, $2, $3, $4, $5, $6)
        `
        await pool.query(query, [location.name, location.image, location.address, location.city, location.state, location.zip])
        console.log(`🏟️  seeded location: ${location.name}`)
    }
}

const seedEvents = async () => {
    for (const event of events) {
        const query = `
            INSERT INTO events (title, date, time, image, location_id)
            VALUES ($1, $2, $3, $4, $5)
        `
        await pool.query(query, [event.title, event.date, event.time, event.image, event.location_id])
        console.log(`⚽ seeded event: ${event.title}`)
    }
}

const reset = async () => {
    try {
        await createTables()
        await seedLocations()
        await seedEvents()
        console.log('✅ database reset complete')
    } catch (error) {
        console.error('❌ error resetting database:', error)
    } finally {
        await pool.end()
    }
}

reset()
