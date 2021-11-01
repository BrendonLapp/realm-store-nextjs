import type { NextApiRequest, NextApiResponse } from 'next';
import { updateGalleryImages } from '../../../../controllers/gallery-controller';
import { GalleryImage } from '../../../../types/gallery-images';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const galleryImage: GalleryImage = {
      imageID: req.body.imageID,
      imageLink: req.body.link,
      altName: req.body.altName,
    };

    const message = await updateGalleryImages(galleryImage);

    if (message) {
      return res.status(200).json(message);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json('Something has gone wrong on the server.');
  }
}
