import { TestBed } from '@angular/core/testing';

import { PhotoService } from './photo.service';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicStorageModule } from '@ionic/storage';

describe('PhotoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [IonicStorageModule.forRoot()],
    providers: [Camera],
  }));

  it('should be created', () => {
    const service: PhotoService = TestBed.get(PhotoService);
    expect(service).toBeTruthy();
  });
});
