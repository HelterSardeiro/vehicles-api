import { Express } from 'express';
import { CreateVehicleController } from '../controllers/create-vehicle/create-vehicle';
import { DeleteVehicleController } from '../controllers/delete-vehicle/delete-vehicle';
import { GetVehicleController } from '../controllers/get-vehicle/get-vehicle';
import { GetVehiclesController } from '../controllers/get-vehicles/get-vehicles';
import { UpdateVehicleController } from '../controllers/update-vehicle/update-vehicle';
import { MongoCreateVehicleRepository } from '../repositories/create-vehicle/create-vehicle';
import { MongoDeleteVehicleRepository } from '../repositories/delete-vehicle/delete-vehicle';
import { MongoGetVehicleRepository } from '../repositories/get-vehicle/get-vehicle';
import { MongoGetVehiclesRepository } from '../repositories/get-vehicles/get-vehicles';
import { MongoUpdateVehicleRepository } from '../repositories/update-vehicle/update-vehicle';

export default function setupRoutes(app: Express) {
  const deleteVehicleRepo = new MongoDeleteVehicleRepository();
  const deleteVehicleController = new DeleteVehicleController(deleteVehicleRepo);
  const getVehicleRepo = new MongoGetVehicleRepository();
  const getVehicleController = new GetVehicleController(getVehicleRepo);
  const getVehiclesRepo = new MongoGetVehiclesRepository();
  const getVehiclesController = new GetVehiclesController(getVehiclesRepo);
  const updateVehicleRepo = new MongoUpdateVehicleRepository();
  const updateVehicleController = new UpdateVehicleController(updateVehicleRepo, getVehiclesRepo);
  const createVehicleRepo = new MongoCreateVehicleRepository();
  const createVehicleController = new CreateVehicleController(createVehicleRepo, getVehiclesRepo);

  // Create vehicle
  app.post('/api/vehicles', async (req, res) => {
    const response = await createVehicleController.handle({ body: req.body });
    res.status(response.statusCode).send(response.body);
  });

  // Delete vehicle
  app.delete('/api/vehicles/:id', async (req, res) => {
    const response = await deleteVehicleController.handle({ params: req.params });
    res.status(response.statusCode).send(response.body);
  });

  // Get a single vehicle
  app.get('/api/vehicles/:id', async (req, res) => {
    const response = await getVehicleController.handle({ params: req.params });
    res.status(response.statusCode).send(response.body);
  });

  // Get all vehicles
  app.get('/api/vehicles', async (req, res) => {
    const response = await getVehiclesController.handle();
    res.status(response.statusCode).send(response.body);
  });

  // Update vehicle
  app.put('/api/vehicles/:id', async (req, res) => {
    const response = await updateVehicleController.handle({ body: req.body, params: req.params });
    res.status(response.statusCode).send(response.body);
  });
}
