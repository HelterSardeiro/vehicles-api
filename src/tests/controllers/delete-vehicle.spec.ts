import request from "supertest";
import createApp from '../../app';
import { MongoDeleteVehicleRepository } from '../../repositories/delete-vehicle/delete-vehicle'; // Import direto para mocks
import { Express } from 'express';

let app: Express;

// Mockar o módulo de repositório inteiro
jest.mock('../../repositories/delete-vehicle/delete-vehicle', () => {
  return {
    MongoDeleteVehicleRepository: jest.fn().mockImplementation(() => ({
      deleteVehicle: jest.fn().mockResolvedValue({
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

describe('DeleteVehicle Integration Tests', () => {
  it('should delete a vehicle successfully', async () => {
    const response = await request(app).delete('/api/vehicles/1');
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
