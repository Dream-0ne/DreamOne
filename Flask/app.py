from flask import Flask
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


@app.route('/')
def hello():
    return 'Hello, World!'
