from flask import Flask
import mySqlDB
from flask_sqlalchemy import SQLAlchemy
import json
app = Flask(__name__)

mySqlDB.connect()
mySqlDB.createTables()
# STRING_LENGTH = 100
# PHONE_NUMBER_LENGTH = 15
# class Occassion(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(STRING_LENGTH))
#     filter = db.Column(db.String(STRING_LENGTH))

# class Filters(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(STRING_LENGTH))
#     tag = db.Column(db.String(STRING_LENGTH))

# class Buisness_tags(db.Model):
#     tag_id = db.Column(db.Integer, primary_key=True)
#     id = db.Column(db.Integer)

# class Buisness_filters(db.Model):
#     filter_id = db.Column(db.Integer, primary_key=True)
#     id = db.Column(db.Integer)
#     filter = db.Column(db.String(STRING_LENGTH))

# class Buisness(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.Text)
#     phone_number = db.Column(db.String(20))
#     address = db.Column(db.Text)
    

@app.route('/occasions', methods=['GET'])
def occasionList():
    occasionlist = mySqlDB.getOccasions()
    # print(type(occasionList))
    return json.dumps(occasionlist)

if __name__ == "__main__":
    app.run()
