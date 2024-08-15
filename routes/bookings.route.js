import { Router } from "express"
import { deleteBookings, getAllBookings, getBookingById, postBookings, updateBookings } from "../controllers/bookings.controller.js"
import { checkUserSession } from "../middleware/auth.js";

export const bookingsRoutes = Router();


bookingsRoutes.post('/bookings', checkUserSession, postBookings)
bookingsRoutes.get('/bookings/:id', checkUserSession, getBookingById)
bookingsRoutes.get('/bookings', checkUserSession, getAllBookings)
bookingsRoutes.put('/bookings/:id', checkUserSession, updateBookings)
bookingsRoutes.delete('/bookings/:id', checkUserSession, deleteBookings)