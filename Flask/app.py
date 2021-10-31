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

@app.route('/filters', methods=['GET'])
def filterList():
    filterList = mySqlDB.getFilters("Birthday")
    return json.dumps(filterList)

if __name__ == "__main__":
    app.run()
