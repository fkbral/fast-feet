import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';
import AddressController from './app/controllers/AddressController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';
import AppController from './app/controllers/AppController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.get('/deliverymen/:id', DeliverymanController.list);
routes.get('/deliverymen/:deliveryman_id/deliveries', AppController.list);
routes.post('/delivery/:delivery_id/confirm-delivery', AppController.store);
routes.get('/delivery/:delivery_id/problems', DeliveryProblemsController.list);
routes.post(
  '/delivery/:delivery_id/problems',
  DeliveryProblemsController.store
);

routes.post('/files', upload.single('file'), FileController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.list);
routes.post('/recipients', RecipientController.store);
routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/recipients/:recipient_id/addresses', AddressController.index);
routes.post('/recipients/:recipient_id/addresses', AddressController.store);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:deliveryman_id/', DeliverymanController.update);
routes.delete('/deliverymen/:deliveryman_id/', DeliverymanController.delete);

routes.get('/deliveries', DeliveryController.index);
routes.get('/deliveries/:id', DeliveryController.list);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

routes.get('/delivery/problems', DeliveryProblemsController.index);
routes.delete(
  '/problem/:id/cancel-delivery',
  DeliveryProblemsController.delete
);

export default routes;
