import { Test, type TestingModule } from '@nestjs/testing';
import { ServerGifService } from './server-gif.service';

describe('ServerGifService', () => {
  let service: ServerGifService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerGifService],
    }).compile();

    service = module.get<ServerGifService>(ServerGifService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
