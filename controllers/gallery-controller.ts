import GalleryRepository from '../repositories/gallery-repository';
import { GalleryImage } from '../types/gallery-images';

const getGalleryImages = async (): Promise<GalleryImage[] | undefined> => {
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

const getAdminGalleryImages = async (): Promise<GalleryImage[] | undefined> => {
  try {
    const galleryRepository = new GalleryRepository();
    const images = galleryRepository.getAdminGalleryImages();

    if (images) {
      return images;
    }
    return [];
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const updateGalleryImages = async (
  galleryImage: GalleryImage
): Promise<string> => {
  try {
    const galleryRepository = new GalleryRepository();
    const success: number = await galleryRepository.updateGalleryImages(
      galleryImage
    );

    if (success === 1) {
      return 'Update succeeded';
    }
    return 'Update failed';
  } catch (error) {
    console.error(error);
    return 'Update failed';
  }
};

export { getGalleryImages, getAdminGalleryImages, updateGalleryImages };
