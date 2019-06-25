import {Router} from 'express';
import {catchAsync} from "../middlewares/errors";
import contactController from '../controllers/contactController';
import jwtAuth from '../middlewares/auth';

export default () => {
    const api = Router();
    api.get('/contact', catchAsync(contactController.contact));
    api.post('/contactForm', catchAsync(contactController.contactForm));
    api.post('/remove/', catchAsync(contactController.remove));
    api.get('/readAllMessages', jwtAuth, catchAsync(contactController.readAllMessages));
    api.put('/update', catchAsync(contactController.update));
    return api;
}
