# Multi-Domain Recommender System
In today's dynamic and information-rich landscape, users often grapple with the 
challenge of navigating through an overwhelming array of choices, struggling to 
find content that aligns with their individual preferences and interests. Recommender systems emerge as a pivotal solution to alleviate this dilemma by 
offering tailored suggestions
## Problem Statement
- Information Overload and Decision Fatigue:
    - The abundance of options can cause decision paralysis, making it harder for users to find relevant content. This process can also be time-consuming and stressful. 
    - ![image](https://github.com/user-attachments/assets/e8fb9fb5-6fa2-446a-a6d8-03df6f4d528d)
- Generic Recommendations:
   - Existing recommendation systems on platforms also sometimes tend to offer generic and common items that are not tailored to user's preferences. Although this diversity in recommendations is good, it could be frustrating sometimes.
- Single domain focus:
    - Existing recommendation systems only recommends items of their domain (and rightfully so!). This may create fragmented experience when navigating through multiple         platforms for getting the perfect recommendation. So there is a need for a unified, multi-domain recommender system that provides personalized suggestions on a single platform. 
      This could be transformed into a social media platform where users interact and recommend each other stuff,sort of like letterboxd but for multiple domains, but that's for another project !
      

## Solution
- A multi-domain recommender system that offers personalized recommendations for **movies, TV shows, books, online courses, and restaurants** on a single platform,         
  mitigating the challenges users face with overwhelming choices, lack of personalization and fragmented experience when navigating through multiple platforms.
- Integrates **content-based filtering techniques**, enhanced by contextual factors like location to deliver relevant recommendations.
- Includes a **chatbot feature**, powered by **Gemini AI**, to offer interactive, prompt-based recommendations tailored to user preferences.

![image](https://github.com/user-attachments/assets/b9c3c467-2ac4-4ef3-a037-243611797063)

## Tech Stack
- **Backend**: Flask (Python)
- **Frontend**: React, Node.js
- **Database**: MongoDB for secure storage and retrieval of user data
- **Machine Learning Models**: Bag of Words (BoW), TF-IDF (Term Frequency-Inverse Document Frequency)
- **NLP**: Gemini AI API integration for chatbot.
- **Deployment**: Docker, AWS, and Jenkins for scalable and continuous integration

## Approach
- Data Collection: Gathered datasets for movies, tv series, books, restaurants, and courses mainly from Kaggle.
- Data Processing: Cleaned and analyzed the data, using NLP techniques to extract meaningful features.
- Model Development: Implement BoW and TF-IDF models to analyze user preferences and content similarity.
- Integration: Build a web application with integrated models for real-time recommendations.
- Privacy: Implement encryption and anonymization to protect user data.

## Some Website Screenshots
----
![image](https://github.com/user-attachments/assets/1da300b0-300a-4ad4-b176-85a185a0ae51)

----
![image](https://github.com/user-attachments/assets/a11cbfc5-20ed-4bd8-a3ce-e373d5c987b9)

----
![image](https://github.com/user-attachments/assets/4185186c-3167-4aaf-b9fd-f497e6f45ac9)

## Conclusion
- In conclusion, “Multi-Domain Recommender System”, has successfully 
addressed the longstanding issue of the absence of a personalized and all-encompassing 
recommender system. By developing a multi-domain recommender system spanning 
across movies, web series, books, online courses, and restaurants, we have catered to 
diverse user interests and preferences under one platform.
