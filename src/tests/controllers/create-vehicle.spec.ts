// Mocka o repositório antes de importá-lo
jest.mock('../../repositories/create-vehicle/create-vehicle');

// Importa o repositório após mocká-lo
import { MongoCreateVehicleRepository } from '../../repositories/create-vehicle/create-vehicle';
import request from "supertest";
import createApp from '../../app';
import { generateLicensePlate } from '../helper/index';
import { Express } from 'express';

let app: Express;  // Declarando app fora para que possa ser acessado em todos os testes

// Usando o hook beforeAll para inicializar o app antes de executar os testes
beforeAll(async () => {
  app = await createApp();  // Inicializa o app
});

describe('CreateVehicle Integration Tests', () => {
  it('should create a vehicle successfully', async () => {
    const newLicensePlate = generateLicensePlate();

    // Configura o mock para retornar um objeto de veículo quando o método createVehicle for chamado
    (MongoCreateVehicleRepository.prototype.createVehicle as jest.Mock).mockResolvedValue({
      id: '123',
      licensePlate: newLicensePlate,
      make: 'Test Make',
      model: 'Test Model',
      year: '2020',
      mileage: 100
    });

    const response = await request(app).post('/api/vehicles').send({
      licensePlate: newLicensePlate,
      make: 'Test Make',
      model: 'Test Model',
      year: '2020',
      mileage: 100
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should fail to create a vehicle with incomplete data', async () => {
    (MongoCreateVehicleRepository.prototype.createVehicle as jest.Mock).mockRejectedValue(new Error('Invalid data'));

    const response = await request(app).post('/api/vehicles').send({
      make: 'Test Make'
    });

    expect(response.statusCode).toBe(400);
  });
});
