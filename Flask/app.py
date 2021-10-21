from flask import Flask
from mySqlDB import createOccasions

app = Flask(__name__)


@app.route('/')
def hello():
    occasionlist = createOccasions()
    return 'Hello, World! the first occasion is ' + str(occasionlist[0][1])
if __name__ == "__main__":
    app.run()
