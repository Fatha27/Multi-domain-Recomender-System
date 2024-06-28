# from flask import Flask, render_template, request, redirect, url_for
# from models.movierec import MovieRecommender
# from models.bookrec import BookRecommender
# import pandas as pd
# import os
# # Set the desired working directory
# #desired_directory = "D:\\majorp"
# #os.chdir(desired_directory)
# # Get the directory of the current script
# script_dir = os.path.dirname(os.path.abspath(__file__))

# # Set the working directory to the script directory
# os.chdir(script_dir)

# # Print the current working directory to confirm the change
# print("Current Working Directory:", os.getcwd())

# app = Flask(__name__)

# # Create instances of recommender classes
# movie_recommender = MovieRecommender()
# book_recommender = BookRecommender()

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/moviess', methods=['GET', 'POST'])
# def movies():
#     if request.method == 'POST':
#         movie_name = request.form.get('movie_name')
        
#         # Return the recommendations to the template
#         movie_recommender = MovieRecommender()
#         recommendations = movie_recommender.recommend_movies(movie_name)

#         return render_template('moviess.html', recommendations=recommendations)

#     return render_template('moviess.html', recommendations=[])  # Set to an empty list if not submitted

# @app.route('/books', methods=['GET', 'POST'])
# def books():
#     if request.method == 'POST':
#         book_name = request.form.get('book_name')
#         # Add logic to get book recommendations using BookRecommender
#         recommendations = book_recommender.recommend_books(book_name)

#         # Return the recommendations to the template
#         return render_template('books.html', recommendations=recommendations)

#     return render_template('books.html', recommendations=[])  # Set to an empty list if not submitted

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, render_template, request,make_response
from models.movierec import MovieRecommender
from models.bookrec import BookRecommender  # You'll need to create movierec.py based on the structure of bookrec.py
import os
import pandas as pd
import pickle
from flask_cors import CORS
# clean_book=pickle.load(open('clean_book.pkl','rb'))
# similarity_bbow=pickle.load(open('similairty_bbow.pkl','rb'))
# finbd=pickle.load(open('finbd.pkl','rb'))

# Set the desired working directory
#desired_directory = "D:\\finalmajor"
#os.chdir(desired_directory)
# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Set the working directory to the script directory
os.chdir(script_dir)

# Print the current working directory to confirm the change
print("Current Working Directory:", os.getcwd())
app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/booksm', methods=['GET', 'POST'])
def books():
    if request.method == 'POST':
        book_name = request.json.get('book_name')
        print("error:", book_name)
        book_recommender = BookRecommender()
        recommendations = book_recommender.recommend_books(book_name)  # or use bookrec.recommend_bow
        # for recommendation in recommendations:
        #     recommendation['Id'] = int(recommendation['Id'])
        response = make_response({"recommendations": recommendations})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response.headers['Access-Control-Allow-Methods'] = 'POST','GET'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

        return response
    #     return render_template('booksm.html', recommendations=recommendations)
    # return render_template('booksm.html', recommendations=[])
        # response = make_response({"recommendations": recommendations})
        # response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        # response.headers['Access-Control-Allow-Methods'] = 'POST'
        # response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

        # return response

@app.route('/moviesm', methods=['POST'])
def movies():
    if request.method == 'POST':
        movie_name = request.json.get('movie_name')
        print("error:", movie_name)
        movie_recommender = MovieRecommender()
        recommendations = movie_recommender.recommend_movies_tf(movie_name)  # Assuming a similar function in movierec.py
        for recommendation in recommendations:
            recommendation['Id'] = int(recommendation['Id'])
        response = make_response({"recommendations": recommendations})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response.headers['Access-Control-Allow-Methods'] = 'POST','GET'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

        return response
    #     return render_template('moviesm.html', recommendations=recommendations)
    # return render_template('moviesm.html', recommendations=[])
       

if __name__ == '__main__':
    app.run(debug=True)
