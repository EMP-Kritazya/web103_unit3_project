import express from 'express'
import EventsController from '../controllers/events.js'

const router = express.Router()

// define routes to get events
router.get('/', EventsController.getEvents)
router.get('/:id', EventsController.getEvent)

export default router
