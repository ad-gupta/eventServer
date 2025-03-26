import { Router } from "express";
import {createEvent, getEvents, updateEvent, deleteEvent, toggleRSVP} from "../controllers/event.js"

const router = Router();

router.route('/').post(createEvent).get(getEvents)

router.route('/:id').put(updateEvent).delete(deleteEvent)

router.post('/:id/rsvp', toggleRSVP)
export default router;