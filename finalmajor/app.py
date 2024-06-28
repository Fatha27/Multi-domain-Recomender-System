
from flask import Flask, render_template, request,make_response,jsonify,session
from flask_session import Session
from markupsafe import Markup
import google.generativeai as genai
import re
from models.courserarec import CourseRecommender
from models.movierec import MovieRecommender
from models.bookrec import BookRecommender  
import pandas as pd
import pickle
import os
from models.restrec import RestaurantRecommender
from models.udemy import UdemyRecommender
from models.webseriesrec import WebSeriesRecommender
from flask_cors import CORS,cross_origin
import json

script_dir = os.path.dirname(os.path.abspath(__file__))

# Set the working directory to the script directory
os.chdir(script_dir)

# Print the current working directory to confirm the change
# print("Current Working Directory:", os.getcwd())
import pickle
import bz2

# Load the pickle file containing the web model
with open('web_model_clean', 'rb') as f:
    web_model = pickle.load(f)

# app = Flask(__name__)
# CORS(app)

app = Flask(__name__)
CORS(app, supports_credentials=True)  # Enable CORS for all routes and set supports_credentials to True

# Configure server-side session
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = False
Session(app)



genai.configure(api_key="")

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 0,
    "max_output_tokens": 1000,
}

safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
]

system_instruction = """You are an expert named Recom-AI, specialized in recommending movies, web series, books, restaurants, and online courses.

1. Identify what kind of recommendation the user wants, and just give the response in this manner,
 unless the user does not specify any number, give at least 3 different recommendations:
Things to include in your responses for each category:

i. Movies:
   - Title, synopsis, genres, rating, top 3 lead actors/actresses, director.
ii. Books:
   - Title, synopsis, genres, author, rating.
iii. Web Series:
   - Title, synopsis, genres, top 3 lead actors/actresses, platform.
iv. Online Courses:
   - Course name, instructor, platform, rating.
v. Restaurants:
   - Name, area, rating, cuisine, average price for two.
2. If the user asks about specific preferences or aspects of a recommendation, engage with them to better understand their needs.
3. If the user asks something unrelated, politely inform them that you can't answer that and offer assistance with recommendations.

To maintain context during the conversation:
- Remember the user's previous query and use it to guide subsequent responses.
- Avoid asking repetitive or unnecessary questions, unless clarification is genuinely needed.
- If the user provides additional information in response to a question, incorporate it into the ongoing conversation without restarting the dialogue.

"""

model = genai.GenerativeModel(
    model_name="gemini-1.5-pro-latest",
    generation_config=generation_config,
    system_instruction=system_instruction,
    safety_settings=safety_settings
)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/booksm', methods=['GET', 'POST'])
def books():
    if request.method == 'POST':
        book_name = request.json.get('book_name')
        book_recommender = BookRecommender()
        recommendations = book_recommender.recommend_books(book_name)
        response = make_response({"recommendations": recommendations})
        response.headers['Access-Control-Allow-Origin'] = 'http://recom-ai.site:3000'
        response.headers['Access-Control-Allow-Methods'] = 'POST','GET'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

        return response  # or use bookrec.recommend_bow
    #     return render_template('booksm.html', recommendations=recommendations,book_name=book_name)
    # return render_template('booksm.html', recommendations=[])

# @app.route('/moviesm', methods=['GET', 'POST'])
# @cross_origin(origin='localhost:3000', headers=['Content-Type'])
# @app.route('/moviesm', methods=['GET', 'POST'])
# def movies():
#     if request.method == 'POST':
#         movie_name = request.json.get('movie_name')
#         movie_recommender = MovieRecommender()
#         recommendations = movie_recommender.recommend_movies_tf(movie_name) 
#         for recommendation in recommendations:
#             recommendation['Id'] = int(recommendation['Id'])
#         response = make_response({"recommendations": recommendations})
#         response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
#         response.headers['Access-Control-Allow-Methods'] = 'POST','GET'
#         response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

#         return response # Assuming a similar function in movierec.py
#     #     return render_template('moviesm.html', recommendations=recommendations,movie_name=movie_name)
#     # return render_template('moviesm.html', recommendations=[])


@app.route('/moviesm', methods=['GET', 'POST']) # Correctly specify the origin
def movies():
    if request.method == 'POST':
        movie_name = request.json.get('movie_name')
        movie_recommender = MovieRecommender()
        recommendations = movie_recommender.recommend_movies_tf(movie_name)
        for recommendation in recommendations:
            recommendation['Id'] = int(recommendation['Id'])
        response = make_response({"recommendations": recommendations})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response.headers['Access-Control-Allow-Methods'] = 'POST, GET'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

        return response

@app.route('/webseries', methods=['GET', 'POST'])
def webseries():
    if request.method == 'POST':
        series_name = request.json['series_name']
        webseries_recommender = WebSeriesRecommender()
        recommendations = webseries_recommender.recommend_web_series(series_name)
        response = make_response({"recommendations": recommendations})
        response.headers['Access-Control-Allow-Origin'] = 'http://recom-ai.site:3000'
        response.headers['Access-Control-Allow-Methods'] = 'POST','GET'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

        return response
    #     return render_template('webseries.html', recommendations=recommendations, series_name=series_name)
    # return render_template('webseries.html', recommendations=None)

@app.route('/udemy', methods=['GET', 'POST'])
def udemy():
    if request.method == 'POST':
        title_utf = request.json['title_utf']
        print(title_utf)
        title_utf_recommender = UdemyRecommender()
        recommendations = title_utf_recommender.recommend_utf(title_utf)
        response = make_response({"recommendations": recommendations})
        response.headers['Access-Control-Allow-Origin'] = 'http://recom-ai.site:3000'
        response.headers['Access-Control-Allow-Methods'] = 'POST','GET'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

        return response
    #     return render_template('udemy.html', recommendations=recommendations, title_utf=title_utf)
    # return render_template('udemy.html', recommendations=None)

@app.route('/coursera', methods=['GET', 'POST'])
def coursera():
    if request.method == 'POST':
        course_name = request.json['course_name']
        course_name_recommender = CourseRecommender()
        recommendations = course_name_recommender.recommend_ctf(course_name)
        response = make_response({"recommendations": recommendations})
        response.headers['Access-Control-Allow-Origin'] = 'http://recom-ai.site:3000'
        response.headers['Access-Control-Allow-Methods'] = 'POST','GET'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

        return response
    #     return render_template('coursera.html', recommendations=recommendations, course_name=course_name)
    # return render_template('coursera.html', recommendations=None)

@app.route('/restaurants', methods=['GET', 'POST'])
def recommend_restaurants():
    if request.method == 'POST':
        city_name = request.json['city_name']
        restaurant_name = request.json['restaurant_name']
        restaurant_recommender = RestaurantRecommender()
        recommendations = restaurant_recommender.recommend_bow_city(restaurant_name, city_name)
        response = make_response({"recommendations": recommendations})
        response.headers['Access-Control-Allow-Origin'] = 'http://recom-ai.site:3000'
        response.headers['Access-Control-Allow-Methods'] = 'POST','GET'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

        return response
    #     return render_template('restaurants.html', recommendations=recommendations, city_name=city_name, restaurant_name=restaurant_name)
    # return render_template('restaurants.html', recommendations=None)

# testing

# @app.route('/data.json')
# def get_data():
#     # Load PKL file
#     with open('udemy_clean.pkl', 'rb') as f:
#         data = pickle.load(f)
    
#     # Convert to JSON
#     json_data = [{'key': key, 'value': value} for key, value in data.items()]
#     print(json_data)
#     return jsonify(json_data)


# @app.route('/chat', methods=['POST'])
# def chat():
#     if request.method == 'POST':
#         user_input = request.json['user_input']
        
#         # Retrieve previous context from session
#         conversation_history = session.get('conversation_history', [])
        
#         # Append the new user input to the conversation history
#         conversation_history.append("User: " + user_input)
        
#         # Create the prompt with conversation history
#         prompt = "\n".join(conversation_history)
        
#         # Generate response
#         response = model.generate_content([prompt])
#         response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
#         response.headers['Access-Control-Allow-Methods'] = 'POST','GET'
#         response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
#         formatted_response = format_response(response.text)
        
#         # Append the bot response to the conversation history
#         conversation_history.append("Recom-AI: " + response.text)
        
#         # Update the session with the new conversation history
#         session['conversation_history'] = conversation_history

#         return jsonify({'response': Markup(formatted_response)})

# def format_response(text):
#     # Replace the specific headings with bold tags and add line breaks for readability
#     replacements = {
#         "\n": "<br>",
#         "Synopsis:": "<b>Synopsis:</b>",
#         "Genres:": "<b>Genres:</b>",
#         "Rating:": "<b>Rating:</b>",
#         "Top 3 Lead Actors/Actresses:": "<b>Top 3 Lead Actors/Actresses:</b>",
#         "Director:": "<b>Director:</b>",
#         "Instructor:": "<b>Instructor:</b>",
#         "Platform:": "<b>Platform:</b>",
#         "Area:": "<b>Area:</b>",
#         "Cuisine:": "<b>Cuisine:</b>",
#         "Average price for two:": "<b>Average price for two:</b>",
#         "Average Price for Two": "<b>Average Price for Two</b>",
#         "Author:": "<b>Author:</b>"
#     }

#     for key, value in replacements.items():
#         text = text.replace(key, value)
    
#     # Convert Markdown bold to HTML bold
#     text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
    
#     return text


@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['user_input']
    
    # Retrieve previous context from session
    conversation_history = session.get('conversation_history', [])
    
    # Append the new user input to the conversation history
    conversation_history.append("User: " + user_input)
    
    # Create the prompt with conversation history
    prompt = "\n".join(conversation_history)
    
    # Generate response
    response = model.generate_content([prompt])
    formatted_response = format_response(response.text)
    
    # Append the bot response to the conversation history
    conversation_history.append("Recom-AI: " + response.text)
    
    # Update the session with the new conversation history
    session['conversation_history'] = conversation_history

    # Create a Flask response object
    flask_response = make_response(jsonify({'response': Markup(formatted_response)}))
    
    # Set CORS headers on the response object
    flask_response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    flask_response.headers['Access-Control-Allow-Methods'] = 'POST, GET'
    flask_response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    
    return flask_response

def format_response(text):
    # Replace the specific headings with bold tags and add line breaks for readability
    replacements = {
        "\n": "<br>",
        "Synopsis:": "<b>Synopsis:</b>",
        "Genres:": "<b>Genres:</b>",
        "Rating:": "<b>Rating:</b>",
        "Top 3 Lead Actors/Actresses:": "<b>Top 3 Lead Actors/Actresses:</b>",
        "Director:": "<b>Director:</b>",
        "Instructor:": "<b>Instructor:</b>",
        "Platform:": "<b>Platform:</b>",
        "Area:": "<b>Area:</b>",
        "Cuisine:": "<b>Cuisine:</b>",
        "Average price for two:": "<b>Average price for two:</b>",
        "Average Price for Two": "<b>Average Price for Two</b>",
        "Author:": "<b>Author:</b>"
    }

    for key, value in replacements.items():
        text = text.replace(key, value)
    
    # Convert Markdown bold to HTML bold
    text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
    
    return text




if __name__ == '__main__':
    # Change the host parameter to '0.0.0.0' to listen on all network interfaces
    app.run(host='0.0.0.0', port=5000)





