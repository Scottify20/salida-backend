import { Request, Response, Router, request } from 'express';
import { AxiosError, AxiosResponse } from 'axios';

import express from 'express';
import axios from 'axios';
require('dotenv').config();

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'You request url is incomplete!' });
});

router.get('/*', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  const tmdbRequestUrl = `${process.env.TMDB_BASE_URL}${req.params[0]}`;

  const tmdbOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
    params: req.query,
  };

  try {
    const response: AxiosResponse = await axios.get(tmdbRequestUrl, tmdbOptions);
    res.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const axiosErrorStatus: number = error.status || 500;
      const axiosErrorMessage: string = error.response?.data.status_message;

      res
        .status(axiosErrorStatus)
        .json({ message: 'Error fetching data from TMDB API', error: axiosErrorMessage });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

export default router;
