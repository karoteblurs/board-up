import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { findByUsername } from '../models/user';

export const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.log('authController/signin error: BadData');
    res.sendStatus(400);
    return;
  }

  try {
    const { user, error } = await findByUsername(username);

    if (error) {
      console.log('authController/signin error:', error.message);
      res.sendStatus(500);
      return;
    }

    if (!user) {
      console.log('authController/signin error: NoUserFound');
      res.sendStatus(500);
      return;
    }

    const passMatch = await bcrypt.compare(password, user.password!);

    if (!passMatch) {
      console.log('authController/signin error: PasswordsNoMatch');
      res.sendStatus(401);
      return;
    }

    // COOKIE AUTH

    res.status(200).json({
      _id: user._id,
      username: user.username,
      hostingBoardups: [],
      attendingBoardups: [],
    });
  } catch (error) {
    console.log('authController/signin error:', error);
    res.sendStatus(500);
  }
};