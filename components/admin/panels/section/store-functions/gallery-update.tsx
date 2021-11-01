import axios from 'axios';
import { useEffect, useState } from 'react';
import { GalleryImage } from '../../../../../types/gallery-images';
import GalleryImageRow from './gallery-image-row';

const GalleryUpdate = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getGalleryData = async () => {
      const images: any = await axios.get(
        '/api/admin/store-functions/get-gallery-images'
      );

      if (typeof images !== 'string') {
        setGalleryImages(images.data);
      } else {
        setError(images);
      }

      setLoading(false);
    };

    if (loading) {
      getGalleryData();
    }
  }, [galleryImages]);
  return (
    <>
      <div style={{ paddingTop: '2%', paddingLeft: '2%', paddingRight: '2%' }}>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <td>Alt Name</td>
              <td>Link</td>
            </tr>
          </thead>
          <tbody>
            {galleryImages &&
              galleryImages.map((image: GalleryImage, index: number) => (
                <GalleryImageRow
                  linkSrc={image.imageLink}
                  nameAlt={image.altName}
                  imageID={image.imageID}
                  key={index}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GalleryUpdate;
