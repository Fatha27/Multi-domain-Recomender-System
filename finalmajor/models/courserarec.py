from matplotlib.pyplot import clf
import pandas as pd
import pickle
import os
import json

class CourseRecommender:
    def __init__(self):
        self.cdf = self.load_course_data()
        self.sim = self.load_similarity_matrix()
    def load_course_data(self):
        with open("cdf.pkl", 'rb') as f:
            cdf = pickle.load(f)
        return cdf
    def load_similarity_matrix(self):
        with open("similarity_ctf.pkl", 'rb') as f:
            sim = pickle.load(f)
        return sim
    def recommend_ctf(self, course_name):
        course_name = ' '.join(w.capitalize() for w in course_name.split())    
        index = self.cdf[self.cdf['course'].apply(lambda x: ' '.join(w.capitalize() for w in x.split())) == course_name].index
        if not index.empty:
            index = index[0]       
            distances_btf = sorted(list(enumerate(self.sim[index])),reverse=True,key = lambda x: x[1])
            recommended_course=[]
            recommended_titles_set = set()  
            counter=0
            recommendations = []

            for i in distances_btf[1:50]:
               title = self.cdf.iloc[i[0]].course
               if title not in recommended_titles_set and title!=course_name:
                    recommended_titles_set.add(title)
                    course_index = i[0]
                    recommended_course = self.cdf.iloc[course_index]
                    recommendation = {
                            "Course": recommended_course['course'],
                            "Partner": recommended_course['partner'],
                            "Skills": recommended_course['skills'],
                            "Rating": recommended_course['rating'],
                            "Level": recommended_course['level'],
                            "Certificate type":recommended_course['certificatetype'],
                            "Duration":recommended_course['duration']
                        }
                    recommendations.append(recommendation)
                    counter += 1
               if counter == 6:
                    break
            return recommendations
        else:
            return []
