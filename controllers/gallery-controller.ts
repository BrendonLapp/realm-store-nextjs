import GalleryRepository from '../repositories/gallery-repository';
import { GalleryImages } from '../types/gallery-images';

const getGalleryImages = async (): Promise<GalleryImages[] | undefined> => {
  try {
    const galleryRepository = new GalleryRepository();
    const images = galleryRepository.getGalleryImages();

    if (images) {
      return images;
    }
    return [];
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const updateGalleryImages = async (): Promise<string> => {
  try {
    const galleryRepository = new GalleryRepository();
    const success: number = await galleryRepository.updateGalleryImages();

    if (success === 1) {
      return 'Update succeeded';
    }
    return 'Update failed';
  } catch (error) {
    console.error(error);
    return 'Update failed';
  }
};

export { getGalleryImages };
