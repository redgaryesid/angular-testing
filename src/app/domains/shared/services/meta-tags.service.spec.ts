import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { MetaTagsService } from './meta-tags.service';
import { Meta, Title } from '@angular/platform-browser';

describe('MetaTagsService', () => {
  let spectator: SpectatorService<MetaTagsService>;
  let metaPlatform: Meta;
  let titlePlatform: Title;

  const createService = createServiceFactory({
    service: MetaTagsService,
    providers: [
      {
        provide: Title,
        useValue: {
          setTitle: jest.fn(),
        },
      },
      {
        provide: Meta,
        useValue: {
          updateTag: jest.fn(),
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createService();
    metaPlatform = spectator.inject(Meta);
    titlePlatform = spectator.inject(Title);
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should update meta tags', () => {
    spectator.service.updateMetaTags({
      title: 'Test Title',
      description: 'Test Description',
      image: 'Test Image',
      url: 'Test URL',
    });
    expect(metaPlatform.updateTag).toHaveBeenCalledTimes(6);
    expect(titlePlatform.setTitle).toHaveBeenCalledWith('Test Title');
  });

  it('should use default metadata when no metadata is provided', () => {
    spectator.service.updateMetaTags({});
    
    expect(titlePlatform.setTitle).toHaveBeenCalledWith('Ng Store');
  });

  it('should handle partial metadata updates', () => {
    spectator.service.updateMetaTags({ title: 'Partial Title' });
    
    expect(titlePlatform.setTitle).toHaveBeenCalledWith('Partial Title');
  });

  it('should handle empty metadata object', () => {
    spectator.service.updateMetaTags({});
    
    expect(titlePlatform.setTitle).toHaveBeenCalledWith('Ng Store');
  });

  it('should handle null or undefined metadata gracefully', () => {
    spectator.service.updateMetaTags(null as any);
    expect(titlePlatform.setTitle).toHaveBeenCalledWith('Ng Store');

    spectator.service.updateMetaTags(undefined as any);
    expect(titlePlatform.setTitle).toHaveBeenCalledWith('Ng Store');
  });

  it('should not throw errors when metadata properties are missing', () => {
    expect(() => {
      spectator.service.updateMetaTags({ title: 'Only Title' });
    }).not.toThrow();
    expect(titlePlatform.setTitle).toHaveBeenCalledWith('Only Title');
  });

  it('should handle metadata with empty strings', () => {
    spectator.service.updateMetaTags({
      title: '',
      description: '',
      image: '',
      url: '',
    });
    expect(titlePlatform.setTitle).toHaveBeenCalledWith('');
  });

  it('should prioritize provided metadata over defaults', () => {
    spectator.service.updateMetaTags({
      title: 'Custom Title',
      description: 'Custom Description',
    });
    expect(metaPlatform.updateTag).toHaveBeenCalledWith({
      name: 'title',
      content: 'Custom Title',
    });
    expect(metaPlatform.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: 'Custom Description',
    });
    expect(titlePlatform.setTitle).toHaveBeenCalledWith('Custom Title');
  });
});