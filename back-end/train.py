#Note : The Model is trained only Once

import pandas
from sklearn.neighbors import NearestNeighbors
import joblib

movies = pandas.read_csv('movies.csv')
ratings = pandas.read_csv('ratings.csv')
users = pandas.read_csv('users.csv')
rating_pivot = ratings.pivot_table(values = 'rating',columns = 'userId',index = 'movieId').fillna(0)

knn_model = NearestNeighbors(metric = 'cosine')
knn_model.fit(rating_pivot)

with open("knn_model.joblib","wb") as f:
    joblib.dump(knn_model, f)