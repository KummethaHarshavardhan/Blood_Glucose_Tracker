import jwt from 'jsonwebtoken';
import { ApiError } from './errorMiddleware.js';


export const requireAuth = (req, res, next) => {
  const [scheme, token] = (req.headers.authorization || '').split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new ApiError(401, 'Please log in to continue.', 'AUTH_REQUIRED'));
  }

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, { algorithms: ['HS256'] });
    if (payload.type !== 'access' || !payload.sub) {
      throw new Error('Wrong token type');
    }
    req.user = { id: payload.sub };
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Your session has expired.', 'TOKEN_EXPIRED'));
    }
    return next(new ApiError(401, 'Invalid access token.', 'TOKEN_INVALID'));
  }
};


export const requireTrustedOrigin = (req, res, next) => {
  const origin = req.headers.origin;
  if (origin && origin !== process.env.CLIENT_URL) {
    return next(new ApiError(403, 'Request origin is not allowed.', 'ORIGIN_FORBIDDEN'));
  }
  return next();
};
