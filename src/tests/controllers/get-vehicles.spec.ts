// Importando as bibliotecas necessárias
import request from "supertest";
import createApp from '../../app';
import { MongoGetVehiclesRepository } from '../../repositories/get-vehicles/get-vehicles'; // Import direto para mocks
import { Express } from 'express';

let app: Express;

// Mockar o módulo de repositório inteiro
jest.mock('../../repositories/get-vehicles/get-vehicles', () => {
  const originalModule = jest.requireActual('../../repositories/get-vehicles/get-vehicles');
  return {
    ...originalModule,
    MongoGetVehiclesRepository: jest.fn().mockImplementation(() => ({
      getVehicles: jest.fn().mockResolvedValue([
        { id: '1', licensePlate: 'ABC123', make: 'Toyota', model: 'Corolla', year: '2020', mileage: 15000 },
        { id: '2', licensePlate: 'XYZ789', make: 'Honda', model: 'Civic', year: '2019', mileage: 25000 }
      ]),
      checkLicensePlateUnique: jest.fn().mockResolvedValue(true)
    }))
  };
});

beforeAll(async () => {
  app = await createApp(); // Inicializa o app
});

describe('GetVehicles Integration Tests', () => {
  it('should retrieve all vehicles successfully', async () => {
    const response = await request(app).get('/api/vehicles');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      { id: '1', licensePlate: 'ABC123', make: 'Toyota', model: 'Corolla', year: '2020', mileage: 15000 },
      { id: '2', licensePlate: 'XYZ789', make: 'Honda', model: 'Civic', year: '2019', mileage: 25000 }
    ]);
  });
});
