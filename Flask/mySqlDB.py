import mysql.connector # Pip install mysql connector.py


def createOccasions():
  cnx = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="addlocalpasswordhere",
  )
  occasions = ["Birthday","Nightout","Party","Date","Exploring"]
  results = ""
  cursor = cnx.cursor()
  cursor.execute("CREATE DATABASE if not exists DreamOneDB ")
  cursor.execute("USE DreamOneDB")
  cursor.execute("CREATE table if not exists occasions (id int(11), name varchar(250), PRIMARY KEY(id))")
  for i in range(5):
    sql = "REPLACE INTO occasions (id, name) VALUES (%s, %s)"
    val = (i,str(occasions[i]))
    cursor.execute(sql,val)
  cnx.commit()
  cursor.execute("SELECT * FROM occasions")
  results= cursor.fetchall()

  cnx.close()
  return results