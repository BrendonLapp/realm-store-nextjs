import type { NextApiRequest, NextApiResponse } from 'next';
import { getAdminGalleryImages } from '../../../../controllers/gallery-controller';
import { GalleryImage } from '../../../../types/gallery-images';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GalleryImage[] | string>
) {
  try {
    const galleryData = await getAdminGalleryImages();

    if (galleryData) {
      return res.status(200).json(galleryData);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json('Something has gone wrong on the server.');
  }
}
