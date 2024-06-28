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

    def recommend_movies_bow(self, movie_name):
        index = self.movies_data[self.movies_data['original_title'] == movie_name].index[0]
        distances = sorted(list(enumerate(self.similarity[index])), reverse=True, key=lambda x: x[1])
        for i in distances[1:10]:
            recommended_movie = self.movies_data.iloc[i[0]]
            print(f"Title: {recommended_movie['original_title']}, Director: {recommended_movie['director']}")

    def recommend_movies_tf(self, movie_name):
        index = self.movies_data[self.movies_data['original_title'] == movie_name].index[0]
        distances = sorted(list(enumerate(self.similarity[index])), reverse=True, key=lambda x: x[1])
        for i in distances[1:10]:
            recommended_movie = self.movies_data.iloc[i[0]]
            print(f"Title: {recommended_movie['original_title']}, Director: {recommended_movie['director']}")
        
    def recommend_movies_tf(self, movie_name, top_n=5):
        index = self.movies_data[self.movies_data['original_title'] == movie_name].index[0]
        print(movie_name) #testing
        distances = sorted(list(enumerate(self.similarity[index])), reverse=True, key=lambda x: x[1])
        recommended_movies = []
        for i in distances[1:top_n+1]:
            movie_info = {
                'Title': self.movies_data.iloc[i[0]]['original_title'],
                'Director': self.movies_data.iloc[i[0]]['director'],
                'Cast': self.movies_data.iloc[i[0]]['cast'],
                'Overview': self.movies_data.iloc[i[0]]['overview'],
                'Runtime': self.movies_data.iloc[i[0]]['runtime'],
                'Genres': self.movies_data.iloc[i[0]]['genres'],
                'Release Date': self.movies_data.iloc[i[0]]['release_date'],
                
                'Vote Average': self.movies_data.iloc[i[0]]['vote_average'],
                'Id': self.movies_data.iloc[i[0]]['id']
                # Add more fields as needed
            }
            recommended_movies.append(movie_info)

        return recommended_movies





def collapse(L):
    L1 = []
    for i in L:
        L1.append(i.replace(" ", ""))
    return L1

#if __name__ == '__main__':
    # movie_recommender = MovieRecommender()
    # print("Recommendations using Bag-of-Words:")
    # movie_recommender.recommend_movies_bow('Interstellar')
    # print("\nRecommendations using Tf-idf:")
    # movie_recommender.recommend_movies_tf('Interstellar')
