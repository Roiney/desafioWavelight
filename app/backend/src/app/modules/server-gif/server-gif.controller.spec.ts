import { Test, type TestingModule } from '@nestjs/testing';
import { ServerGifController } from './server-gif.controller';
import { ServerGifService } from './server-gif.service';

describe('ServerGifController', () => {
  let controller: ServerGifController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServerGifController],
      providers: [ServerGifService],
    }).compile();

    controller = module.get<ServerGifController>(ServerGifController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
