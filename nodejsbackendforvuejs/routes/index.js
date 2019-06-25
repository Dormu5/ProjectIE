import {Router} from 'express';
import {catchAsync} from "../middlewares/errors";
import AuthController from '../controllers/authController';
import pagesController from '../controllers/pagesController';
import jwtAuth from '../middlewares/auth';


export default () => {
    const api = Router();

    api.get('/home',jwtAuth, catchAsync(pagesController.home));
    api.get('/inbox', jwtAuth,  catchAsync(AuthController.register));
    api.get('/', catchAsync(pagesController.loginScreen));
    api.get('/registration', catchAsync(pagesController.registration));


    return api;
}
