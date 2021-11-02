from flask import Flask, Response, render_template, request
import psycopg2 
import json

app = Flask(__name__)
# connect to the db
conn = psycopg2.connect(host="35.196.73.133", database="proj1part2", user="hh2916", password="1093")

# cursor
cur = conn.cursor()

@app.route("/")
def home():
    return "Hello, Flask!"

@app.route("/departments")
def departments():
    # construct json files
    cur.execute("select * from departments");
    rows = cur.fetchall()
    json_list = []
    for r in rows: 
        did = r[0]
        name = r[1]
        json_list.append({"did": did, "name": name})
    return Response(json.dumps(json_list), mimetype='application/json')

@app.route('/track_courses', methods=["POST", "GET"])
def track_courses():
    #return "test"
    if request.method=="POST":
        tname = request.form["tracks"]
        year = request.form["years"]
        semester = request.form["semesters"]
        query = """
                SELECT
                    CONCAT(Courses.did, Courses.cnum) AS code,
                    Courses.name,
                    Sections.snum AS section,
                    Sections.time,
                    Sections.location,
                    Sections.description,
                    Instructors.name AS Instructor,
                    Courses.credits,
                    Course_Associates.type
                FROM Sections
                LEFT JOIN Courses
                ON Courses.did = Sections.did AND Courses.cnum = Sections.cnum
                LEFT JOIN Course_Associates
                ON Course_Associates.cnum = Courses.cnum
                LEFT JOIN Tracks
                ON Tracks.tid = Course_Associates.tid
                LEFT JOIN Instructors
                ON Instructors.iid = Sections.iid
                WHERE Sections.year = {qyear} AND Sections.semester = '{qsemester}' AND Tracks.name = '{qtrack}'; 
                """.format(qyear = year, qsemester = semester, qtrack = tname)
        cur.execute(query)
        rows = cur.fetchall()
        json_list = []
        for r in rows:
            code = r[0]
            name = r[1]
            section = r[2]
            time = r[3]
            location = r[4]
            description = r[5]
            json_list.append({"code": code, "name": name, "section": section, "time": time, "location": location, "description": description})
            
        return Response(json.dumps(json_list), mimetype='application/json')

    else:
        return render_template("track_courses.html")

@app.route('/next_courses', methods=["POST", "GET"])
def next_courses():
    if request.method=="POST":
        sid = request.form["sid"]
        tname = request.form["tracks"]
        year = request.form["years"]
        semester = request.form["semesters"]
        query = """
                    SELECT
                    CONCAT(Courses.did, Courses.cnum) AS code,
                    Courses.name,
                    Sections.snum AS section,
                    Sections.time,
                    Sections.location,
                    Sections.description,
                    Instructors.name AS Instructor,
                    Courses.credits,
                    Course_Associates.type
                FROM Sections
                LEFT JOIN Courses
                ON Courses.did = Sections.did AND Courses.cnum = Sections.cnum
                LEFT JOIN Course_Associates
                ON Course_Associates.cnum = Courses.cnum
                LEFT JOIN Tracks
                ON Tracks.tid = Course_Associates.tid
                LEFT JOIN Instructors
                ON Instructors.iid = Sections.iid
                WHERE Sections.year = {qyear} AND Sections.semester = '{qsemester}' AND Tracks.name = '{qtname}'
                AND CONCAT(Courses.did, Courses.cnum) NOT IN (
                    SELECT 
                        CONCAT(Courses.did, Courses.cnum) AS code
                    FROM Enrollments
                    LEFT JOIN Sections
                    ON Sections.secid = Enrollments.secid
                    LEFT JOIN Courses
                    ON Courses.did = Sections.did AND Courses.cnum = Sections.cnum
                    WHERE Enrollments.sid = {qsid})
                """.format(qyear = year, qsemester = semester, qtname = tname, qsid = sid)
        cur.execute(query)
        rows = cur.fetchall()
        json_list = []

        for r in rows:
            code = r[0]
            name = r[1]
            section = r[2]
            time = r[3]
            location = r[4]
            description = r[5]
            instructor = r[6]
            ccredits = r[6]
            ctype = r[7]

            json_list.append({"code": code, "name": name, "section": section, "time": time, "location": location,
                            "description": description, "instructor": instructor, "credits": ccredits, "ctype": ctype})
            
        return Response(json.dumps(json_list), mimetype='application/json')
        
    else:
        return render_template("next_courses.html")



@app.route('/find_comments', methods=["POST", "GET"])
def find_comments():
    if request.method=="POST":
        did = request.form["departments"]
        cnum = request.form["cnum"]
        course = did+cnum
        course = course.upper()
        query = """
                SELECT
                Students.sid,
                Students.username,
                Comments.cid,
                Comments.text,
                Comments.date,
                CONCAT(Courses.did, Courses.cnum) AS course,
                Sections.snum AS section,
                Sections.year,
                Sections.semester
            FROM Comments
            LEFT JOIN Students
            ON Students.sid = Comments.sid
            LEFT JOIN Sections
            ON Sections.secid = Comments.secid
            LEFT JOIN Courses
            ON Courses.did = Sections.did AND Courses.cnum = Sections.cnum
            WHERE CONCAT(Courses.did, Courses.cnum) = '{qcourse}'           
            """.format(qcourse = course)
        cur.execute(query)
        rows = cur.fetchall()
        json_list = []

        for r in rows:
            sid = r[0]
            username = r[1]
            cid = r[2]
            text = r[3]
            date = str(r[4])
            ccourse = r[5]
            section = r[6]
            year = r[7]
            semester = r[8]
            json_list.append({"sid": sid, "username": username, "cid": cid, "text": text, "date": date,
                            "course": ccourse, "section": section, "year": year, "semester": semester})

        print(json_list)
        return Response(json.dumps(json_list), mimetype='application/json')    
    else:
        return render_template("find_comments.html")