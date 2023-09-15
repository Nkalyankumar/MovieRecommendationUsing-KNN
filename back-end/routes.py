from flask import Flask, request, jsonify, session
from flask_cors import CORS
import sqlite3
import joblib
import numpy
import pandas
import csv
from flask_session import Session



app = Flask(__name__)
app.secret_key = 'my_super_secret_key_123'
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
received_data = {'message': 'No message received'}  
li = []
history_element = ''
username = ''  



#Default route
@app.route('/')
def home():
    return "None"



#login page route(gets data from frontend and performs validation)
@app.route('/login', methods=['POST'])
def login():
    global received_data
    global username
    if request.method == 'POST':
        data = request.get_json()
        user_name = data.get('user')
        username = user_name  # Set the global username variable
        password = data.get('password')
        received_data = {'user': user_name, "password": password}
        return check_user(user_name, password)



#signup page route(gets data from frontend and adds data to database)
@app.route('/signup', methods=['POST'])
def signup():
    global li
    if request.method == 'POST':
        data = request.get_json()
        user_name = data.get('user')
        password = data.get('password')
        Name = data.get('Name')
        age = data.get('age')
        selectedOptions = data.get('selectedOptions')
        li = [user_name, password, Name, age, selectedOptions]
        return register_user(user_name, password, Name, age, selectedOptions)




#mainpage route(this performs knn classificationon history and intrests and pass result data to front end)
@app.route('/mainpage', methods=['GET','POST'])
def mainpage():
    global username
    if request.method == "GET":
        data1 = mix_recomendation(username)
        return jsonify(data1)
    if request.method == 'POST':
        return get_history(username)
    


#addtohistory route(the new movie is added to user history in database when it is clicked)
@app.route('/addtohistory', methods=["POST"])
def addtohistory():
    global history_element
    global username 
    if request.method == 'POST':
        data = request.get_json()
        history_element = data.get('history_data')
        add_to__history(username,history_element)
        return 'None'



#history route(passes the current history to frontend )
@app.route('/history',methods=['GET'])
def history():
    global username
    if request.method == "GET":
        history_data = get_history(username)
        return jsonify(history_data)




def register_user(user_name, password, Name, age, selectedOptions):
    with sqlite3.connect("user_data.db") as connection:
        cursor = connection.cursor()
        data = cursor.execute("Select * from USERDATA").fetchall()
        users_list = [x[0] for x in data]
        if(user_name not in users_list):
            cursor.execute("INSERT INTO USERDATA VALUES (?, ?, ?, ?, ?,?)",
                       (user_name, password, Name, age, str(selectedOptions),str([])))
            connection.commit()
        else:
            return 'False'
        return 'True'



def check_user(user_name, password):
    with sqlite3.connect("user_data.db") as connection:
        cursor = connection.cursor()
        data = cursor.execute("Select * from USERDATA").fetchall()

        for user_data in data:
            if (str(user_data[0]) == str(user_name) and str(user_data[1]) == str(password)):
                return 'True'
        return 'False'



def recomend_movies(movies_list):
    movies = pandas.read_csv('movies.csv')
    ratings = pandas.read_csv('ratings.csv')
    rating_pivot = ratings.pivot_table(values='rating', columns='userId', index='movieId').fillna(0)
    movie_ids = []
    with open("knn_model.joblib", "rb") as f:
        knn_model = joblib.load(f)
    for x in movies_list:
        distance, neighbours = knn_model.kneighbors([rating_pivot.loc[x]])
        movie_ids.extend(neighbours[0])
    element_frequency = {}
    for item in movie_ids:
        if item in element_frequency:
            element_frequency[item] += 1
        else:
            element_frequency[item] = 1
    keys = list(element_frequency.keys())
    values = list(element_frequency.values())
    sorted_value_index = numpy.argsort(values)
    sorted_dict = {keys[i]: values[i] for i in sorted_value_index}
    sorted_movie_ids = list(sorted_dict.keys())
    sorted_movie_ids.reverse()
    recomended_movies = []
    for x in sorted_movie_ids:
        recomended_movies.append(movies.iloc[x].tolist())
    recomended_movies = [[int(item) if isinstance(item, numpy.int64) else item for item in movie] for movie in recomended_movies]
    return recomended_movies



def add_to__history(username,new_history_element):
    with sqlite3.connect("user_data.db") as connection:
        cursor = connection.cursor()
        data = cursor.execute("Select * from USERDATA").fetchall()
        new_history = [new_history_element]
        for user_data in data:
            if((user_data[0] ==username) and (new_history_element not in eval(user_data[5]))):
                new_history.extend(eval(user_data[5]))
                cursor.execute("UPDATE USERDATA SET history = ? WHERE username = ?",(str(new_history),username))
                connection.commit()
        data = cursor.execute("Select * from USERDATA").fetchall()



def get_history(user_name):
    with sqlite3.connect("user_data.db") as connection:

        cursor = connection.cursor()
        data = cursor.execute("Select * from USERDATA").fetchall()
        for user_data in data:
            if((user_data[0] ==user_name)):
               return user_data[5]
        return "None"



def recomend_from_intrests(user_name):
    with sqlite3.connect("user_data.db") as connection:
        cursor = connection.cursor()
        data = cursor.execute("Select * from USERDATA").fetchall()
    user_intrests = []
    for user_data in data:
        if((user_data[0] == user_name)):
            user_intrests = eval(user_data[4])
            break
    movies = pandas.read_csv('movies.csv')
    recomended_movies = []
    for index,row in movies.iterrows():
        iter_genre = row.tolist()[3].split("|")
        if(all(item in user_intrests for item in iter_genre)):
            recomended_movies.append(movies.iloc[index].tolist())
    recomended_movies = [[int(item) if isinstance(item, numpy.int64) else item for item in movie] for movie in recomended_movies]
    return recomended_movies[:30]



def mix_recomendation(user_name):
    movies_list = get_history(user_name)
    movies = pandas.read_csv('movies.csv')
    movie_ids = []
    for movie in eval(movies_list):
        for index,row in movies.iterrows():
            if(row[2] == movie):
                movie_ids.append(movies.iloc[index].tolist()[0])
    data1 = recomend_movies(movie_ids)
    data2 = recomend_from_intrests(username)
    data1.extend(data2)
    return data1



if __name__ == '__main__':
    app.run(debug=True, port=5000)


