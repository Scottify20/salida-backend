export interface UserPreferences {
  details: {
    movieAndSeriesDetails: MovieAndSeriesDetailsOverlapPreferences;
    movieDetails: MovieDetailsSpecificPreferences;
    personDetails: PersonDetailsPreferences;
  };
}

interface MovieDetailsPreferences
  extends MovieDetailsSpecificPreferences,
    MovieAndSeriesDetailsOverlapPreferences {}

interface MovieAndSeriesDetailsOverlapPreferences {
  reviews: ReviewsPreferences;
}

interface MovieDetailsSpecificPreferences {
  releases: MovieReleasesPreferences;
}

interface MovieReleasesPreferences {
  groupBy?: 'release-type' | 'country';
  dateOrder?: DateOrder;
  countryOrder?: 'a-z' | 'z-a';
  localCountryCode?: string;
}

interface ReviewsPreferences {
  reviewsSource?: 'tmdb' | 'salida';
  dateOrder?: DateOrder;
  ratingOrder?: 'highest-first' | 'lowest-first';
  orderBy?: 'date' | 'rating';
}

interface PersonDetailsPreferences {}

type DateOrder = 'newest-first' | 'oldest-first';
