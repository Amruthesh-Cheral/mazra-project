import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return next(new ApiError(401, 'Unauthorized - No token provided'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new ApiError(401, 'Unauthorized - Invalid token'));
    }
    req.user = decoded;
    next();
  });
};