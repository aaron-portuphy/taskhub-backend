import jwt from "jsonwebtoken";

export const checkUserSession = (req, res, next) => {
    if (req.session && req.session.user) {
      req.user = req.session.user;  // Attach the user object from the session to req.user
      return next();
    }
  
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
          return res.status(401).json({ error: 'Token is missing' });
        }
        req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);  // Verify the token and attach the user to req.user
        return next();
      } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
      }
    }
  
    return res.status(401).json({ error: 'Not authenticated' });
  };