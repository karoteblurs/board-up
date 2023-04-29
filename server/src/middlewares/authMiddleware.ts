import { NextFunction, Request, Response, json } from 'express';
import jwt from 'jsonwebtoken';

import { AuthToken } from '../models/authToken';
import { AuthenticatedRequest } from '../models/authenticatedRequest';

interface Route {
  path: string;
  method: string;
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const unrestrictedRoutes: Route[] = [{ path: '/user', method: 'POST' }];
  const unrestrictedRoute = unrestrictedRoutes.findIndex(
    (route) => route.path === req.path && route.method === req.method
  );
  if (unrestrictedRoute !== -1) next();

  // [ START Verify User ]
  // Cookie
  const { authToken } = req.cookies;

  if (!authToken) {
    console.log('authMiddleware error: MissingAuthToken');
    res.sendStatus(401);
    return;
  }

  // Verify the token
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.log('authMiddleware error: NoSecret');
    res.sendStatus(500);
    return;
  }

  const token = jwt.verify(authToken, secret) as AuthToken;
  // [ END Verify User ]

  req.token = token;
  next();
};

export default authMiddleware;