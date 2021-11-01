import { connectToDB } from '../lib/mysql-connection';
import { GalleryImage } from '../types/gallery-images';

class GalleryRepository {
  public getGalleryImages = async (): Promise<GalleryImage[] | undefined> => {
    const connection = connectToDB();

    if (connection) {
      const sqlQuery = `
        SELECT imageID, imageLink, altName FROM Gallery WHERE imageLink NOT LIKE '' AND altName NOT LIKE ''`;

      return new Promise((resolve, reject) => {
        connection.query(sqlQuery, function (error: any, result: any) {
          if (error) {
            reject(error);
          }
          const rows: GalleryImage[] = JSON.parse(JSON.stringify(result));
          connection.end();
          resolve(rows);
        });
      });
    }
    return undefined;
  };

  public getAdminGalleryImages = async (): Promise<
    GalleryImage[] | undefined
  > => {
    const connection = connectToDB();

    if (connection) {
      const sqlQuery = `
        SELECT imageID, imageLink, altName FROM Gallery`;

      return new Promise((resolve, reject) => {
        connection.query(sqlQuery, function (error: any, result: any) {
          if (error) {
            reject(error);
          }
          const rows: GalleryImage[] = JSON.parse(JSON.stringify(result));
          connection.end();
          resolve(rows);
        });
      });
    }
    return undefined;
  };

  public updateGalleryImages = async (
    galleryImage: GalleryImage
  ): Promise<number> => {
    const connection = connectToDB();

    if (connection) {
      if (!galleryImage.imageID) {
        return 0;
      }

      console.log(galleryImage);

      const sqlQuery = `UPDATE Gallery SET imageLink = ?, altName = ? WHERE imageID = ?`;

      return new Promise((resolve, reject) => {
        connection.query(
          sqlQuery,
          [galleryImage.imageLink, galleryImage.altName, galleryImage.imageID],
          function (error: any, result: any) {
            if (error) {
              reject(error);
            }
            console.log(result);
            resolve(result.insertId);
            connection.end();
          }
        );
      });
    }
    return 0;
  };
}

export default GalleryRepository;
