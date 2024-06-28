import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
import os
import pickle


class BookRecommender:
    def __init__(self):
        # Load and preprocess the dataset
        self.data = self.load_and_preprocess_data()
        
        #clean_book=pickle.load(open('cleaned_books.pkl', 'rb')) 
        self.similarity_matrix = self.calculate_similarity_matrix()

    #   df_loaded = pickle.load(file)
    def load_and_preprocess_data(self):

    #     # Load the dataset
        script_dir = os.path.dirname(os.path.abspath(__file__))

        # Combine the script directory with the filename to get the full path
        file_path = os.path.join(script_dir, 'book_gr.csv')
        # clean_book=pickle.load(open('clean_book.pkl','rb'))
        # finbd=pickle.load(open('finbd.pkl','rb'))

        bdf = pd.read_csv(file_path, engine='python')

        # Drop unnecessary columns
        bdf.drop(['recommendations', 'url'], axis=1, inplace=True)

        # Drop rows with missing values
        bdf = bdf.dropna().reset_index(drop=True)

        # Keep only the first three genres
        bdf['bookGenres'] = bdf['bookGenres'].apply(lambda x: x.split('|')[:3])

        # Function to extract only alphabets from a string
        def extract_alphabets(genres_list):
            return [re.sub(r'[^a-zA-Z\s]', '', genre.split('/')[0]) for genre in genres_list]

        # Apply the function to the 'bookGenres' column
        bdf['CleanedGenres'] = bdf['bookGenres'].apply(extract_alphabets)

        # Select relevant columns
        cleaned_book = bdf[['bookTitle', 'bookAuthors', 'bookDesc', 'CleanedGenres']]

        # Combine genres, description, and authors into a single column
        cleaned_book['Genres'] = cleaned_book['CleanedGenres'].apply(lambda x: ", ".join(x))
        cleaned_book['description'] = cleaned_book['bookDesc'].apply(lambda x: x.split())
        cleaned_book['bookAuthors'] = cleaned_book['bookAuthors'].apply(lambda x: x.split(', '))
        cleaned_book['fulltag'] = cleaned_book['CleanedGenres'] + cleaned_book['description'] + cleaned_book['bookAuthors']
        cleaned_book['fulltag'] = cleaned_book['fulltag'].apply(lambda x: " ".join(x))

        cleaned_book['cleandesc']=cleaned_book['description'].apply(lambda x:", ".join(x))
        cleaned_book['cleandesc'] = cleaned_book['cleandesc'].apply(lambda x: x.replace(',', ''))
        cleaned_book['cleanauth']= cleaned_book['bookAuthors'].apply(lambda x:", ".join(x))
        cleaned_book['cleangenres']= cleaned_book['Genres']
        cleaned_book['cleanpages']= bdf['bookPages']
        cleaned_book['cleanimage']= bdf['bookImage']
        cleaned_book['cleanrating']=bdf['bookRating']


        # Drop unnecessary columns
        finbd = cleaned_book[['bookTitle', 'fulltag','cleandesc','cleanauth','cleangenres','cleanpages','cleanrating','cleanimage']]

        return finbd


    def calculate_similarity_matrix(self):
        # similarity=pickle.load(open('similairty_bbow.pkl','rb'))

        # Create a TfidfVectorizer
        vectorizer = TfidfVectorizer(stop_words='english')

        # Transform the 'fulltag' column into tf-idf vectors
        vectors_tf = vectorizer.fit_transform(self.data['fulltag'])

        # Calculate cosine similarity matrix
        similarity = cosine_similarity(vectors_tf)

        return similarity

    def recommend_books(self, book):
        book = ' '.join(w.capitalize() for w in book.split())
        index = self.data[self.data['bookTitle'].apply(lambda x: ' '.join(w.capitalize() for w in x.split())) == book].index

        # index = self.data[self.data['bookTitle'] == book].index[0]
        if not index.empty:
            index = index[0]
            # Calculate cosine similarity distances
            distances = sorted(list(enumerate(self.similarity_matrix[index])), reverse=True, key=lambda x: x[1])
            recommended_books_set = set()
            counter = 0
            recommendations = []
            # Display the top recommended books with additional information
            
            for i in distances[1:50]:
                title_bow = self.data.iloc[i[0]].bookTitle
                if title_bow not in recommended_books_set and title_bow != book:
                    recommended_books_set.add(title_bow)
                    book_index_bow = i[0]
                    recommended_book = self.data.iloc[book_index_bow]
                    book_info = {
                        'Image': recommended_book['cleanimage'],
                        'Title': recommended_book['bookTitle'],
                        'Overview': recommended_book['cleandesc'],
                        'Pages': recommended_book['cleanpages'],
                        'Genres': recommended_book['cleangenres'],
                        'Author': recommended_book['cleanauth'],
                        'Rating': recommended_book['cleanrating']
                    # 
                    }
                    recommendations.append(book_info)
                    counter += 1
                if counter == 6:
                    break
            return recommendations
        else:
            return []


