import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import ast
import re
import os

class MovieRecommender:
    def __init__(self):
        script_dir = os.path.dirname(os.path.abspath(__file__))
        movies_file = os.path.join(script_dir, 'tmdb_movies.csv')
        credits_file= os.path.join(script_dir, 'tmdb_credits.csv')
        self.movies_data = self.load_and_preprocess_data(credits_file, movies_file)
        self.vectorizer = TfidfVectorizer()
        self.feature_vectors = self.vectorizer.fit_transform(self.movies_data['tags'])
        self.similarity = cosine_similarity(self.feature_vectors)

    def load_and_preprocess_data(self, credits_file, movies_file):
        credits = pd.read_csv(credits_file)
        movies = pd.read_csv(movies_file)
        credits['id'] = credits['movie_id']
        credits.drop(['movie_id'], axis=1, inplace=True)
        movie_merged = movies.merge(credits, on='id')
        movie_merged.drop(['homepage', 'title_x', 'title_y', 'revenue', 'status', 'spoken_languages'], axis=1, inplace=True)
        movie = movie_merged.copy()
        movie['tagline'].fillna('', inplace=True)
        movie.dropna(inplace=True)
        def convert(text):
            L = []
            for i in ast.literal_eval(text):
                L.append(i['name'])
            return L
        movie['genres'] = movie['genres'].apply(convert)
        movie['keywords'] = movie['keywords'].apply(convert)
        movie['cast'] = movie['cast'].apply(convert)
        movie['cast'] = movie['cast'].apply(lambda x: x[:5])
        movie['production_countries'] = movie['production_countries'].apply(convert)

        def convert2(text):
            L = []
            counter = 0
            for i in ast.literal_eval(text):
                if counter < 3:
                    L.append(i['name'])
                counter += 1
            return L
        movie['production_companies'] = movie['production_companies'].apply(convert)
        def fetch_director(text):
            L = []
            for i in ast.literal_eval(text):
                if i['job'] == 'Director':
                    L.append(i['name'])
            return L
        movie['crew'] = movie['crew'].apply(fetch_director)
        movie['director'] = movie['crew']
        movie.drop(['crew', 'vote_count'], axis=1, inplace=True)
        cleaned_movie = movie.copy()
        cleaned_movie['director'] = cleaned_movie['director'].apply(lambda x: ", ".join(x))
        cleaned_movie['cast'] = cleaned_movie['cast'].apply(lambda x: ", ".join(x))
        cleaned_movie['production_companies'] = cleaned_movie['production_companies'].apply(lambda x: ", ".join(x))
        cleaned_movie['production_countries'] = cleaned_movie['production_countries'].apply(lambda x: ", ".join(x))
        cleaned_movie['genres'] = cleaned_movie['genres'].apply(lambda x: ", ".join(x))
        cleaned_movie['keywords'] = cleaned_movie['keywords'].apply(lambda x: ", ".join(x))
        cleaned_movie['tags'] = cleaned_movie['overview'] + cleaned_movie['genres'] + cleaned_movie['keywords'] + cleaned_movie['cast'] + cleaned_movie['director'] + cleaned_movie['production_companies'] + cleaned_movie['production_countries'] + cleaned_movie['tagline'] + cleaned_movie['original_language']
        cleaned_movie['tags'] = cleaned_movie['tags'].apply(lambda x: " ".join(collapse(x.split())))
        return cleaned_movie
      
    def recommend_movies_tf(self, movie_name):
        movie_name = ' '.join(w.capitalize() for w in movie_name.split())
        # index = self.web[self.web['Title'] == title].index[0]
        index = self.movies_data[self.movies_data['original_title'].apply(lambda x: ' '.join(w.capitalize() for w in x.split())) == movie_name].index
        if not index.empty:
            index = index[0]
        # index = self.movies_data[self.movies_data['original_title'] == movie_name].index[0]
            distances = sorted(list(enumerate(self.similarity[index])), reverse=True, key=lambda x: x[1])
            recommended_movies_set = set()
            counter = 0
            recommendations = []
            for i in distances[1:50]:
                title_bow = self.movies_data.iloc[i[0]].original_title
                if title_bow not in recommended_movies_set and title_bow != movie_name:
                    recommended_movies_set.add(title_bow)
                    movies_index_bow = i[0]
                    recommended_movies = self.movies_data.iloc[movies_index_bow]
                    recommendation = {
                        'Title': recommended_movies['original_title'],
                        'Director': recommended_movies['director'],
                        'Cast': recommended_movies['cast'],
                        'Overview': recommended_movies['overview'],
                        'Runtime': recommended_movies['runtime'],
                        'Genres': recommended_movies['genres'],
                        'Release Date': recommended_movies['release_date'],
                        'Vote Average': recommended_movies['vote_average'],
                        'Id': recommended_movies['id']
                        # Add more fields as needed
                    }
                    recommendations.append(recommendation)
                    counter += 1
                if counter == 6:
                    break
            return recommendations
        else:
            return []

def collapse(L):
    L1 = []
    for i in L:
        L1.append(i.replace(" ", ""))
    return L1
