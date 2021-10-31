import mysql.connector
from mysql.connector import connection # Pip install mysql connector.py

STRING_LENGTH = 100
PHONE_NUMBER_LENGTH = 15
ID_SIZE = 11
connection = None
cursor = None

def connect():
  global connection
  global cursor
  connection = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="",
  )
  cursor = connection.cursor()


def createTables():
  cursor.execute("CREATE DATABASE if not exists DreamOneDB ")
  cursor.execute("USE DreamOneDB")
  createOccasions()
  createOccasionsFilters()
  createFiltersTags()
  createBuisness()
  createBuisnessTags()

def createOccasions():
  occasions = ["Birthday","Nightout","Party","Date","Exploring"]
  cursor.execute(f"CREATE table if not exists occasions (id int({ID_SIZE}), name varchar({STRING_LENGTH}), PRIMARY KEY(id))")
  for i in range(5):
    sql = "REPLACE INTO occasions (id, name) VALUES (%s, %s)"
    val = (i,str(occasions[i]))
    cursor.execute(sql,val)
  connection.commit()

def createOccasionsFilters():
  # filters = ['Food', 'shopping', 'sightseeing']
  cursor.execute(f"CREATE table if not exists occasionsfilters (id int({ID_SIZE}), occasionid int({ID_SIZE}), filter varchar({STRING_LENGTH}), PRIMARY KEY(id))")
  # for i in range(3):
  #   cursor.execute(f"REPLACE INTO occasionsfilters (id, occasionid, filter) VALUES ({i},0,\"{filters[i]}\")")
  connection.commit()

def createFiltersTags():
  # tags = ['Mexican','Japanese','Chinese']
  cursor.execute(f"CREATE table if not exists filterTags (filterid int({ID_SIZE}), tag varchar({STRING_LENGTH}), PRIMARY KEY(filterid,tag))")
  # for i in range(3):
  #   cursor.execute(f"REPLACE INTO filterTags (filterid,tag) VALUES (0,'{tags[i]}')")
  connection.commit()

def createBuisness():
  cursor.execute(f"CREATE table if not exists buisness (id int({ID_SIZE}), name varchar({STRING_LENGTH}), phone varchar({PHONE_NUMBER_LENGTH}), address TEXT, PRIMARY KEY(id))")
  connection.commit()

def createBuisnessTags():
  cursor.execute(f"CREATE table if not exists buisness (buisnessid int({ID_SIZE}), filter varchar({STRING_LENGTH}), tag varchar({STRING_LENGTH}), PRIMARY KEY(buisnessid,filter,tag))")
  connection.commit()

def getOccasions():
  cursor.execute("SELECT name FROM occasions")
  results= cursor.fetchall()
  return results

def getFilters(occasion):
  output = {}
  query = f"SELECT f.id, f.filter from occasionsfilters f, occasions o where o.id=f.occasionid and o.name=\"{occasion}\""
  cursor.execute(query)
  filters= cursor.fetchall()
  for filter in filters:
    id,name = filter
    output[name] = getTags(id)
  return output

def getTags(filter):
  cursor.execute(f"SELECT tag from filterTags where filterid='{filter}'")
  results=cursor.fetchall()
  return [result[0] for result in results]

def closeConnection():
  connection.close()
