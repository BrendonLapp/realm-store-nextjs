import { connectToDB } from '../lib/mysql-connection';
import { GalleryImages } from '../types/gallery-images';

class GalleryRepository {
  public getGalleryImages = async (): Promise<GalleryImages[] | undefined> => {
    const connection = connectToDB();

    if (connection) {
      const sqlQuery = `
        SELECT imageID, imageLink, altName FROM Gallery`;

      return new Promise((resolve, reject) => {
        connection.query(sqlQuery, function (error: any, result: any) {
          if (error) {
            reject(error);
          }
          const rows: GalleryImages[] = JSON.parse(JSON.stringify(result));
          connection.end();
          resolve(rows);
        });
      });
    }
    return undefined;
  };

  public updateGalleryImages = async (): Promise<number> => {
    const connection = connectToDB();

    return 1;
  };
}

export default GalleryRepository;
