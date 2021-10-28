from flask import Flask
import mySqlDB
import json
app = Flask(__name__)

mySqlDB.connect()
mySqlDB.createTables()
    

@app.route('/occasions', methods=['GET'])
def occasionList():
    occasionlist = mySqlDB.getOccasions()
    # print(type(occasionList))
    return json.dumps(occasionlist)

if __name__ == "__main__":
    app.run()
