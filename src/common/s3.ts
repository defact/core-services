import { HttpException } from '@nestjs/common';
import { extname, join } from 'path'
import { S3 } from 'aws-sdk';
import * as multer from 'multer-s3';
import ConfigurationService from 'src/configuration/service';

const config = new ConfigurationService();
const s3config = { ...config.get('s3') };  // TODO move to dynamic module

const environment = process.env.NODE_ENV || 'development';

export const options = {
  limits: {
    files: 1,
    fileSize: 1024 * 1024,
  },
  fileFilter: (req: any, file: any, next: any) => {
    if (file.mimetype.match(/\/(png|jpg|jpeg|gif)$/)) return next(null, true);
    next(new HttpException(`Unsupported file type ${extname(file.originalname)}`, 422), false);
  },
  storage: multer({
    s3: new S3(s3config),
    bucket : s3config.bucket,
    acl: 'public-read',
    key: function (request, file, done) {
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
      return done(null, join(environment, `${randomName}${extname(file.originalname)}`))    
    },
  })
};
