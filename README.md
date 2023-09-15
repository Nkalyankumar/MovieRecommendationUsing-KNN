## MovieRecommendationUsing-KNN
![Screenshot (165)](https://github.com/Nkalyankumar/MovieRecommendationUsing-KNN/assets/102470230/2f72b16a-e992-44e5-aacd-5d638ada448b)
The Movie Recommendation System is a personalized content recommendation platform that utilizes the K-Nearest Neighbors (KNN) Classifier. It aims to provide users with movie recommendations based on their interests, personal data, and viewing history.
## Project Description
The system allows users to sign up, input their interests, and provide personal data for good viewing experience. Initially, content recommendations are based on user interests. As users engage with the platform and watch content, the system refines recommendations using historical viewing data in addition to user interests.
## Features
# 1.User Registration
Users can sign up by providing personal information and interests.
# 2.Personalized Recommendations
Initial content recommendations are based on user interests.
# 3.Adaptive Recommendations
As users watch content, the system refines recommendations using viewing history and interests.
# 4.Content Playback
Users can play different recommended content.
# 5.User Authentication
Users can log in and log out of the platform at any time.
## Installation
To install and run the MovieRecommendation Project, follow these steps
1.Clone the project repository from GitHub:
git clone https://github.com/Nkalyankumar/MovieRecommendationUsing-KNN
2.Install the required dependencies. Ensure you have Python and pip installed. Then, navigate to the project directory and run:

Dependencies include

1.sklearn
2.sqlite3
3.joblib
4.numpy
5.pandas
6.Flask
7.flask_cors
8.flask_session

## K-Nearest Neighbors (KNN) Classifier
The recommendation system employs a KNN Classifier for content recommendations. The model is initially trained using the MovieLens dataset. Nearest neighbors for a given user's preferences are determined, and content is recommended based on their similarities.
To prevent repeated training and save time, the trained KNN Classifier model is stored using joblib, ensuring efficiency in content recommendation.
