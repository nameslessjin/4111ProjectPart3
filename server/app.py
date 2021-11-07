from typing import Sized
from flask import Flask, Response, render_template, request
import psycopg2 
import json
from flask_cors import CORS
import hashlib
import datetime

app = Flask(__name__)
CORS(app)
# connect to the db
conn = psycopg2.connect(host="35.196.73.133", database="proj1part2", user="hh2916", password="1093")

# cursor
cur = conn.cursor()

@app.route("/", methods=["GET"])
def home():

    # this page will return a list of department
    cur.execute("SELECT departments.name as dname, tracks.name as tname FROM departments LEFT JOIN tracks ON departments.did = tracks.did")
    rows = cur.fetchall()
    res = []
    dname_list = set()
    for r in rows:
        dname = r[0]
        dname_list.add(dname)

    dname_list = sorted(list(dname_list))
    for d in dname_list:
        t_list = []
        for r in rows:
            if (d == r[0] and r[1]):
                t_list.append(r[1])

        res.append({"dname": d, "t_list": sorted(t_list)})

    return Response(json.dumps(res), mimetype='application/json')

@app.route("/search", methods=["POST", "GET"])
def search():

    if (request.method=="POST"):
        courseOnly = request.args["courseOnly"]
        department = request.args["d"]
        track = request.args["t"].replace("-", " ")
        term = request.args["term"]
        year = term.split("-")[0]
        semester = term.split("-")[1]
        data = request.get_json()
        user_id = data['user_id']


        query = """
                SELECT
                    CONCAT(Courses.did, Courses.cnum) AS code,
                    Courses.name,
                    Sections.snum AS section,
                    Sections.time,
                    Sections.location,
                    Instructors.name AS Instructor,
                    Courses.credits,
                    Course_Associates.type,
                    Sections.secid AS id
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
                """.format(qyear = int(year), qsemester = semester.upper(), qtrack = track)

        if (user_id):
            query = """
                    SELECT
                        CONCAT(Courses.did, Courses.cnum) AS code,
                        Courses.name,
                        Sections.snum AS section,
                        Sections.time,
                        Sections.location,
                        Instructors.name AS Instructor,
                        Courses.credits,
                        Course_Associates.type,
                        Sections.secid AS id
                    FROM Sections
                    LEFT JOIN Courses
                    ON Courses.did = Sections.did AND Courses.cnum = Sections.cnum
                    LEFT JOIN Course_Associates
                    ON Course_Associates.cnum = Courses.cnum
                    LEFT JOIN Tracks
                    ON Tracks.tid = Course_Associates.tid
                    LEFT JOIN Instructors
                    ON Instructors.iid = Sections.iid
                    WHERE Sections.year = {qyear} AND Sections.semester = '{qsemester}' AND Tracks.name = '{qtrack}'
                        AND CONCAT(Courses.did, Courses.cnum) NOT IN (
                            SELECT CONCAT(Courses.did, Courses.cnum) AS code
                            FROM Enrollments
                            LEFT JOIN Sections
                            ON Sections.secid = Enrollments.secid
                            LEFT JOIN Courses
                            ON Courses.did = Sections.did AND Courses.cnum = Sections.cnum
                            WHERE Enrollments.sid = '{user_id}'
                            )
                    ; 
                    """.format(qyear = int(year), qsemester = semester.upper(), qtrack = track, user_id=user_id)


        if (courseOnly == "1"):
            query = """
                    SELECT
                        CONCAT(Courses.did, Courses.cnum) AS code,
                        Courses.name,
                        Courses.credits,
                        Course_Associates.type
                    FROM Sections
                    LEFT JOIN Courses
                    ON Courses.did = Sections.did AND Courses.cnum = Sections.cnum
                    LEFT JOIN Course_Associates
                    ON Course_Associates.cnum = Courses.cnum
                    LEFT JOIN Tracks
                    ON Tracks.tid = Course_Associates.tid
                    WHERE Sections.year = {qyear} AND Sections.semester = '{qsemester}' AND Tracks.name = '{qtrack}'
                    GROUP BY code, Courses.name, credits, type;
                    """.format(qyear = int(year), qsemester = semester.upper(), qtrack = track)

            if (user_id):
                query = """
                        SELECT
                            CONCAT(Courses.did, Courses.cnum) AS code,
                            Courses.name,
                            Courses.credits,
                            Course_Associates.type
                        FROM Sections
                        LEFT JOIN Courses
                        ON Courses.did = Sections.did AND Courses.cnum = Sections.cnum
                        LEFT JOIN Course_Associates
                        ON Course_Associates.cnum = Courses.cnum
                        LEFT JOIN Tracks
                        ON Tracks.tid = Course_Associates.tid
                        WHERE Sections.year = {qyear} AND Sections.semester = '{qsemester}' AND Tracks.name = '{qtrack}'
                            AND CONCAT(Courses.did, Courses.cnum) NOT IN (
                                SELECT CONCAT(Courses.did, Courses.cnum) AS code
                                FROM Enrollments
                                LEFT JOIN Sections
                                ON Sections.secid = Enrollments.secid
                                LEFT JOIN Courses
                                ON Courses.did = Sections.did AND Courses.cnum = Sections.cnum
                                WHERE Enrollments.sid = '{user_id}'
                                )
                        GROUP BY code, Courses.name, credits, type;
                        """.format(qyear = int(year), qsemester = semester.upper(), qtrack = track, user_id = user_id)

        cur.execute(query)
        rows = cur.fetchall()
        json_list = []
        for r in rows:
            if (courseOnly == "0"):
                code = r[0]
                name = r[1]
                section = r[2]
                time = r[3]
                location = r[4]
                instructor = r[5]
                credits = r[6]
                type = r[7]
                id = r[8]
                json_list.append({ "id": id, "code": code, "name": name, "section": section, "time": time, "location": location, "instructor": instructor, "credits": credits, "type": type})
            else:
                code = r[0]
                name = r[1]
                credits = r[2]
                type = r[3]
                json_list.append({"code": code, "name": name, "credits": credits, "type": type})

            
        return Response(json.dumps(json_list), mimetype='application/json')


    return 'bad request!', 400

@app.route('/section/<section_id>', methods=["POST", "GET"])
def section(section_id):
    print('find section info')
    query = """
            SELECT
                CONCAT(Courses.did, Courses.cnum) AS code,
                Courses.name,
                Sections.snum AS section,
                Sections.time,
                Sections.location,
                Instructors.name AS instructor,
                Courses.credits,
                Sections.description
            FROM Sections
            LEFT JOIN Courses
            ON Courses.did = Sections.did AND Courses.cnum = Sections.cnum
            LEFT JOIN Course_Associates
            ON Course_Associates.cnum = Courses.cnum
            LEFT JOIN Tracks
            ON Tracks.tid = Course_Associates.tid
            LEFT JOIN Instructors
            ON Instructors.iid = Sections.iid
            WHERE Sections.secid = {section_id}; 
            """.format(section_id = section_id)
    cur.execute(query)
    result = cur.fetchall()[0]
    print('line 210 result', result)
    section_data = {}
    code = result[0]
    name = result[1]
    section = result[2]
    time = result[3]
    location = result[4]
    instructor = result[5]
    credits = result[6]
    id = section_id
    description = result[7]
    section_data = { "id": id, "code": code, "name": name, "section": section, "time": time, "location": location, "instructor": instructor, "credits": credits, "description": description}
    return Response(json.dumps(section_data), mimetype='application/json')


@app.route('/course/<course_code>', methods=["POST", "GET"])
def course(course_code):

    result = {"course":{}, "section":[]}

    query = """
            SELECT
                CONCAT(Courses.did, Courses.cnum) AS code,
                Courses.name,
                Courses.credits
            FROM Courses
            LEFT JOIN Course_Associates
            ON Course_Associates.cnum = Courses.cnum
            LEFT JOIN Tracks
            ON Tracks.tid = Course_Associates.tid
            WHERE CONCAT(Courses.did, Courses.cnum) = '{course_code}'; 
            """.format(course_code = course_code)


    cur.execute(query)
    fetch = cur.fetchone()
    result["course"] = {"code": fetch[0], "name": fetch[1], "credits": fetch[2]}

    query = """
            SELECT
                Sections.snum AS section,
                Sections.time,
                Sections.location,
                Instructors.name AS instructor,
                Sections.secid AS id,
                Sections.year,
                Sections.semester
            FROM Sections
            LEFT JOIN Courses
            ON Courses.did = Sections.did AND Courses.cnum = Sections.cnum
            LEFT JOIN Instructors
            ON Instructors.iid = Sections.iid
            WHERE CONCAT(Courses.did, Courses.cnum) = '{course_code}'
            ORDER BY year, semester, section
            ; 
            """.format(course_code = course_code)

    cur.execute(query)
    fetch = cur.fetchall()
    section_list = []
    for r in fetch:
        sec = {"section": r[0], "time": r[1], "location": r[2], "instructor": r[3], "id": r[4], "year": r[5], "semester": r[6]}
        section_list.append(sec)
    result["section"] = section_list
    result["course"]["num_of_sec"] = len(section_list)

    return Response(json.dumps(result), mimetype='application/json')


@app.route('/auth', methods=["POST", "GET"])
def auth():
    
    if request.method == "POST":

        data = request.get_json()
        print(data)
        print("\n")
        username = data['username']
        password = data['password']
        is_login = data['is_login']
        password_hash = PasswordHash(password)


        if (not is_login):

            try:
                query = """
                    INSERT INTO Students(username, password)
                    VALUES ('{username}', '{password}');
                """.format( username=username, password=password_hash)
                res = cur.execute(query)
                conn.commit()
                

            except NameError:
                print(NameError)
                user = {"exists": False}
                return Response(json.dumps(user), mimetype='application/json')


        query = """
            SELECT *
            FROM Students
            WHERE Students.username = '{username}' AND students.password = '{password}'
            LIMIT 1;
        """.format(username=username, password=password_hash)

        cur.execute(query)
        fetch = cur.fetchone()



        if fetch != None:
            user = {"id": fetch[0], "username": fetch[1], "exists": True}
        else:
            user = {"exists": False}

        return Response(json.dumps(user), mimetype='application/json')

    return True

def PasswordHash(password):
    temp = hashlib.md5()
    temp.update(password.encode("utf-8"))
    return temp.hexdigest()


@app.route('/user/<user_id>', methods=["POST", "GET"])
def getUserCourseSection(user_id):

    query = """
            SELECT
                Sections.snum AS section,
                Sections.time,
                Sections.location,
                Instructors.name AS instructor,
                Sections.secid AS id,
                Sections.year,
                Sections.semester,
                CONCAT(Courses.did, Courses.cnum) AS code,
                Courses.name,
                Courses.credits
            FROM Sections
            LEFT JOIN Courses
            ON Courses.did = Sections.did AND Courses.cnum = Sections.cnum
            LEFT JOIN Instructors
            ON Instructors.iid = Sections.iid
            LEFT JOIN Enrollments
            ON Enrollments.secid = Sections.secid
            WHERE Enrollments.sid = {user_id}
            ORDER BY year, semester, section
            ; 
            """.format(user_id=user_id)
    
    cur.execute(query)
    fetch = cur.fetchall()
    section_list = []
    for r in fetch:
        sec = {"id": r[4], "code": r[7], "name": r[8], "year": r[5], "semester": r[6], "section": r[0], "time": r[1], "location": r[2], "instructor": r[3], "credits": r[9]}
        section_list.append(sec)
    return Response(json.dumps(section_list), mimetype='application/json')



@app.route('/courseRegistration', methods=["POST", "GET"])
def courseRegistration():
    if (request.method == "POST"):
        data = request.get_json()
        user_id = data["user_id"]
        section_id = data["section_id"]
        action = data["action"]

        print(data)

        if action == "add":
            query = """
                INSERT INTO Enrollments(sid, secid)
                VALUES ({sid}, {secid})
            """.format(sid=user_id, secid=section_id)
        elif action == 'delete':
            query = """
                DELETE FROM Enrollments 
                WHERE sid='{sid}' AND secid='{secid}'
            """.format(sid=user_id, secid=section_id)

        cur.execute(query)
        conn.commit()


    return Response("", status=404)


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

@app.route('/findSectionComment/<section_id>', methods=["POST", "GET"])
def findSectionComment(section_id):
    
    if request.method=='POST':
        query = """
                SELECT
                Students.username,
                Comments.text,
                Comments.date
            FROM Comments
            LEFT JOIN Students
            ON Students.sid = Comments.sid
            WHERE Comments.secid = {qsecid}    
            """.format(qsecid = section_id)

        print('find section comment')
        cur.execute(query)
        rows = cur.fetchall()
        json_list = []
        
        for r in rows:
            username = r[0]
            text = r[1]
            date = r[2]
            json_list.append({"username": username, "text": text, "date": date})
        
        print('result', json_list)
        return Response(json.dumps(json_list), mimetype='application/json')

    else:
        query = """
                SELECT
                Students.username,
                Comments.text,
                Comments.date
            FROM Comments
            LEFT JOIN Students
            ON Students.sid = Comments.sid
            WHERE Comments.secid = {qsecid}    
            """.format(qsecid = section_id)

        cur.execute(query)
        rows = cur.fetchall()
        json_list = []

        for r in rows:
            username = r[0]
            text = r[1]
            date = str(r[2])
            json_list.append({"username": username, "text": text, "date": date})
        
        print(json_list)
        return Response(json.dumps(json_list), mimetype='application/json')


@app.route('/postcomment', methods=['POST', 'GET'])
def postcomment():
    print('post comment')
    data = request.get_json()
    userid = data["userid"]
    section_id = data["secid"]
    comment_content = data["comment_content"]
    ddate = str(datetime.datetime.now().date())
    print(type(ddate))
    query = """
    INSERT INTO comments(sid, secid, text, date)
    VALUES({userid}, {section_id}, '{comment_content}', '{qdate}')
    """.format(userid = userid, section_id = section_id, comment_content = comment_content, qdate = ddate)
    print(query)
    json_data = {"userid": userid, "secid": section_id, "comment_content": comment_content}
    cur.execute(query)
    conn.commit()
    return Response(json.dumps(json_data), mimetype='application/json')