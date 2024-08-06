import request from "supertest";
import createApp from '../../app';
import { MongoUpdateVehicleRepository } from '../../repositories/update-vehicle/update-vehicle'; // Import direto para mocks
import { MongoGetVehiclesRepository } from '../../repositories/get-vehicles/get-vehicles';
import { Express } from 'express';

let app: Express;

// Mockar o módulo de repositório inteiro
jest.mock('../../repositories/update-vehicle/update-vehicle', () => {
  return {
    MongoUpdateVehicleRepository: jest.fn().mockImplementation(() => ({
      updateVehicle: jest.fn().mockResolvedValue({
        id: '1',
        licensePlate: 'UPDATED123',
        make: 'Toyota',
        model: 'Corolla',
        year: '2020',
        mileage: 15000
      })
    }))
  };
});

jest.mock('../../repositories/get-vehicles/get-vehicles', () => {
  return {
    MongoGetVehiclesRepository: jest.fn().mockImplementation(() => ({
      checkLicensePlateUniqueExceptCurrent: jest.fn().mockResolvedValue(true)
    }))
  };
});

beforeAll(async () => {
  app = await createApp(); // Inicializa o app
});

describe('UpdateVehicle Integration Tests', () => {
  it('should update a vehicle successfully', async () => {
    const response = await request(app).put('/api/vehicles/1').send({
      licensePlate: 'UPDATED123',
      make: 'Toyota',
      model: 'Corolla',
      year: '2020',
      mileage: 15000
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      licensePlate: 'UPDATED123',
      make: 'Toyota',
      model: 'Corolla',
      year: '2020',
      mileage: 15000
    });
  });

});
