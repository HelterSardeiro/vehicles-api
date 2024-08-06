import request from "supertest";
import createApp from '../../app';
import { MongoGetVehicleRepository } from '../../repositories/get-vehicle/get-vehicle'; // Import direto para mocks
import { Express } from 'express';

let app: Express;

// Mockar o módulo de repositório inteiro
jest.mock('../../repositories/get-vehicle/get-vehicle', () => {
  return {
    MongoGetVehicleRepository: jest.fn().mockImplementation(() => ({
      getVehicleByID: jest.fn().mockResolvedValue({
        id: '1',
        licensePlate: 'ABC123',
        make: 'Toyota',
        model: 'Corolla',
        year: '2020',
        mileage: 15000
      })
    }))
  };
});

beforeAll(async () => {
  app = await createApp(); // Inicializa o app
});

describe('GetVehicle Integration Tests', () => {
  it('should retrieve a vehicle by ID successfully', async () => {
    const response = await request(app).get('/api/vehicles/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      licensePlate: 'ABC123',
      make: 'Toyota',
      model: 'Corolla',
      year: '2020',
      mileage: 15000
    });
  });
});
