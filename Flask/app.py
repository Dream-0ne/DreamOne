from flask import Flask
from mySqlDB import createOccasions
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)


class Occassion(db.Model):
    name = db.Column(db.String(100))
    filter = db.Column(db.String(100))

class Filters(db.Model):
    name = db.Column(db.String(100))
    tag = db.Column(db.String(100))

class Buisness_tags(db.Model):
    id = db.Column(db.Intger)
    tag = db.Column(db.String(100))

class Buisness_filters(db.Model):
    id = db.Column(db.Intger)
    filter = db.Column(db.String(100))

class Buisness(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    phone_number = db.Column(db.String(20))
    address = db.Column(db.Text)
    

@app.route('/')
def hello():
    occasionlist = createOccasions()
    return 'Hello, World! the first occasion is ' + str(occasionlist[0][1])
if __name__ == "__main__":
    app.run()
