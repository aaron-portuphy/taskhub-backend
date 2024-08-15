import { Bookings } from "../models/bookings.models.js";
import { bookingsSchema } from "../schema/bookings.schema.js";


//Post a booking
export const postBookings = async (req, res) => {
    // Validate request body using the Joi schema
    const { error } = bookingsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    const { streetAddress, houseOrAptNumber, size, details, summary, taskDate, startTime } = req.body;
  
    try {
      // Create a new booking associated with the authenticated user
      const newBooking = new Bookings({
        location: {
          streetAddress,
          houseOrAptNumber,
        },
        taskOptions: {
          size,
          details,
          summary,
        },
        taskDate,
        startTime,
        user: req.user._id, // Assign the user ID from the authenticated user
      });
  
      const savedBooking = await newBooking.save();
      res.status(201).json(savedBooking);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getBookingById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const booking = await Bookings.findById(id);
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getAllBookings = async (req, res) => {
    try {
      const bookings = await Bookings.find();
  
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


export const updateBookings = async (req, res) => {
    const { id } = req.params;
  
    // Validate request body using the Joi schema
    const { error } = bookingsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    const { streetAddress, houseOrAptNumber, size, details, summary, taskDate, startTime } = req.body;
  
    try {
      const updatedBooking = await Bookings.findByIdAndUpdate(
        id,
        {
          location: {
            streetAddress,
            houseOrAptNumber,
          },
          taskOptions: {
            size,
            details,
            summary,
          },
          taskDate,
          startTime,
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedBooking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      res.status(200).json(updatedBooking);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const deleteBookings = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedBooking = await Bookings.findByIdAndDelete(id);
  
      if (!deletedBooking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };