import pandas as pd
import pickle
import bz2
import os
import json
import string

pickle_file_path = "swiggy_model_cleandf"

class RestaurantRecommender:
    def __init__(self):
        self.sd = self.load_restmodel_data()
        self.df = self.load_rest_data()
        self.sim = self.load_similarity_matrix()
    def load_restmodel_data(self):
        with open(pickle_file_path, 'rb') as f:
            sd = pickle.load(f)
        return sd
    def load_rest_data(self):
        with open("swiggy_clean.pkl", 'rb') as f:
            df= pickle.load(f)
        return df
    def load_similarity_matrix(self):
        sim = self.decompressed_pickle('simbow.pbz2')
        return sim
    def decompressed_pickle(self, file):
        with bz2.BZ2File(file, 'rb') as f:
            data = pickle.load(f)
        return data
    

    def recommend_bow_city(self, Restaurant, city):
        city = city.capitalize()
        Restaurant = ' '.join(w.capitalize() for w in Restaurant.split())
        index = self.sd[self.sd['Restaurant'].apply(lambda x: ' '.join(w.capitalize() for w in x.split())) == Restaurant].index
        if not index.empty:
            index = index[0]
            distances = sorted(list(enumerate(self.sim[index])), reverse=True, key=lambda x: x[1])
            recommended_rest_set = set()
            counter = 0
            recommendations = []

            for i in distances[1:100]:
                title_bow = self.sd.iloc[i[0]].Restaurant
                if title_bow not in recommended_rest_set and title_bow != Restaurant and city in self.sd.iloc[i[0]].City:
                    recommended_rest_set.add(title_bow)
                    rest_index_bow = i[0]
                    recommended_rest = self.df.iloc[rest_index_bow]
                    recommendation = {
                        "Restaurant": recommended_rest['Restaurant'],
                        "Cuisine": recommended_rest['Food type'],
                        "Price": recommended_rest['Price'],
                        "Rating": recommended_rest['Avg ratings'],
                        "City": recommended_rest['City'],
                        "Area": recommended_rest['Area']
                    }
                    recommendations.append(recommendation)
                    counter += 1
                if counter == 6:
                    break
            return recommendations
        else:
            return []
   