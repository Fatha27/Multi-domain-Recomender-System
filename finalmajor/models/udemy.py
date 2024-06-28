import pickle
import pandas as pd
class UdemyRecommender:
    def __init__(self):
        self.df = self.load_course_data()
        self.ud = self.load_clean_data()
        self.sim = self.load_similarity_matrix()
    def load_course_data(self):
        with open("udf.pkl", 'rb') as f:
            df = pickle.load(f)
        return df
    def load_clean_data(self):
        with open("udemy_clean.pkl", 'rb') as f:
            ud = pickle.load(f)
        return ud
    def load_similarity_matrix(self):
        with open("usim.pkl", 'rb') as f:
            sim = pickle.load(f)
        return sim

    def recommend_utf(self, title_utf):
        title_utf = ' '.join(w.capitalize() for w in title_utf.split())    
        index_utf = self.ud[self.ud['title'].apply(lambda x: ' '.join(w.capitalize() for w in x.split())) == title_utf].index
        if not index_utf.empty:
            index_utf = index_utf[0] 
            distances_utf = sorted(list(enumerate(self.sim[index_utf])),reverse=True,key = lambda x: x[1])
            recommended_title=[]
            recommended_titles_set = set()  
            counter=0
            recommendations=[]
            for i in distances_utf[1:50]:
               titleu = self.ud.iloc[i[0]].title
               if titleu not in recommended_titles_set and titleu!=title_utf:
                recommended_titles_set.add(titleu)
                title_index = i[0]
                recommended_title = self.df.iloc[title_index]
                recommendation = {
                            "Course": recommended_title['title'],
                            "Instructor": recommended_title['instructor'],
                            "Description": recommended_title['description'],
                            "Rating": recommended_title['rating'],
                            "Level": recommended_title['level'],
                            "Lectures":recommended_title['lectures'],
                            "Duration":recommended_title['duration']
                        }
                recommendations.append(recommendation)
                counter += 1
               if counter == 6:
                    break
            return recommendations
        else:
            return []
