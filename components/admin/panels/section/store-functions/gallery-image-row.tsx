import axios from 'axios';
import { useState } from 'react';
import SubmitButton from '../../../../shared/submit-button';

interface GalleryImageRowProps {
  linkSrc: string;
  nameAlt: string;
  imageID: number;
}

const GalleryImageRow = ({
  linkSrc,
  nameAlt,
  imageID,
}: GalleryImageRowProps) => {
  const [altName, setAltName] = useState(nameAlt);
  const [link, setLink] = useState(linkSrc);

  const updateGalleryItem = async (imageID: number) => {
    try {
      await axios.put('/api/admin/store-functions/update-gallery-image', {
        imageID,
        link,
        altName,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAltNameChange = (event: any) => {
    setAltName(event.target.value);
  };

  const handleLinkChange = (event: any) => {
    setLink(event.target.value);
  };

  return (
    <tr style={{ display: 'flex' }}>
      <td style={{ width: '30%' }}>
        <div className="form-group">
          <input
            className="form-control"
            value={altName}
            onChange={(event) => handleAltNameChange(event)}
          />
        </div>
      </td>
      <td style={{ width: '50%' }}>
        <div className="form-group">
          <input
            className="form-control"
            value={link}
            onChange={(event) => handleLinkChange(event)}
          />
        </div>
      </td>

      <td>
        <SubmitButton
          name={'update'}
          submitAction={() => updateGalleryItem(imageID)}
        />
      </td>
    </tr>
  );
};

export default GalleryImageRow;
