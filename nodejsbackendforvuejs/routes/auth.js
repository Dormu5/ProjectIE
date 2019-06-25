import {Router} from 'express';
import {catchAsync} from "../middlewares/errors";
import AutoController from '../controllers/authController';
import passport from 'passport';

export default () => {
    const api = Router();

    api.post('/login', passport.authenticate('local', {session: false}), catchAsync(AutoController.login));
    api.post('/register', catchAsync(AutoController.register));

    return api;
}

