import pickle
import bz2
import pandas as pd
import json
import numpy as np
import os

class WebSeriesRecommender:
    def __init__(self):
        self.web = self.load_web_series_data()
        self.sim = self.load_similarity_matrix()

    def load_web_series_data(self):
        with open("web_model_clean", 'rb') as f:
            web = pickle.load(f)
        web.rename(columns={"Series Title": "Title"}, inplace=True)
        return web

    def load_similarity_matrix(self):
        sim = self.decompressed_pickle('simsbow.pbz2')
        return sim

    def compressed_pickle(self, title, data):
        with bz2.BZ2File(title + '.pbz2', 'wb') as f:
            pickle.dump(data, f)

    def decompressed_pickle(self, file):
        with bz2.BZ2File(file, 'rb') as f:
            data = pickle.load(f)
        return data

    def recommend_web_series(self, title):
        title = ' '.join(w.capitalize() for w in title.split())
        index = self.web[self.web['Title'].apply(lambda x: ' '.join(w.capitalize() for w in x.split())) == title].index
        if not index.empty:
            index = index[0]
            distances = sorted(list(enumerate(self.sim[index])), reverse=True, key=lambda x: x[1])

            recommended_series = []
            recommended_series_set = set()
            counter = 0
            recommendations = []

            for i in distances[1:100]:
                title_bow = self.web.iloc[i[0]].Title
                if title_bow not in recommended_series_set and title_bow != title:
                    recommended_series_set.add(title_bow)
                    series_index_bow = i[0]
                    recommended_series = self.web.iloc[series_index_bow]

                    recommendation = {
                        "Series": recommended_series['Title'],
                        "Genre": recommended_series['Genre'],
                        "Rating": recommended_series['Rating'],
                        "Cast": recommended_series['Cast'],
                        "Duration": recommended_series['Runtime'],
                        "Description": recommended_series['Synopsis']
                    }

                    recommendations.append(recommendation)
                    counter += 1
                if counter == 6:
                    break

            return recommendations
        else:
            return []

    def ask_for_recommendation(self):
        title = input("Enter a series name: ")
        title = ' '.join(w.capitalize() for w in title.split())
        self.recommend_web_series(title)

