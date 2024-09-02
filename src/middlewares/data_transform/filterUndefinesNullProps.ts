import { NextFunction, Request, Response } from 'express';
import { UserInFireStore } from '../../interfaces/models/User';

export default function filterUndefinedNullProps(req: Request, res: Response, next: NextFunction) {
  res.setHeader('Content-Type', 'application/json');

  if (typeof req.body !== 'object' || Array.isArray(req.body)) {
    res.status(400).json({ message: 'Request body must be an object' });
  }

  try {
    function removeNullUndefinedPropertiesAndValues(obj: { [key: string]: any }): Object {
      if (typeof obj !== 'object' || obj === null) {
        return obj;
      }

      if (Array.isArray(obj)) {
        return obj
          .map(removeNullUndefinedPropertiesAndValues)
          .filter((item) => item !== null && item !== undefined);
      }

      const filteredObj: { [key: string]: any } = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];

          if (value !== undefined && value !== null) {
            filteredObj[key] = removeNullUndefinedPropertiesAndValues(value);
          }
        }
      }
      return filteredObj;
    }

    let newObj: { [key: string]: any } = removeNullUndefinedPropertiesAndValues(req.body);
    req.body = newObj;
    next();
  } catch (err) {
    console.log('error filtering undefined/null properties', err);
    res.status(500).json({ message: 'Internal server error' });
    next(err);
  }
}
