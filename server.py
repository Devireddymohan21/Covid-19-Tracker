import pymysql.cursors
import tornado.ioloop
import tornado.web
import smtplib
import requests
import random
import json
import ssl
import jwt
import datetime

SECRET_KEY = 'skdjdsidsmidejencdjwei' 

def get_connection():
    return pymysql.connect(
        host='localhost',
        user='root',
        password="Saimohan@18",
        db='covid_dashboard',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

def generate_token(email):
    print("genT")
    payload = { 
                'email': email,
                "iat": datetime.datetime.now(datetime.timezone.utc),
                'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=2) 
            }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token



class BaseHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "http://localhost:3000")
        self.set_header("Access-Control-Allow-Headers", "Authorization,Content-Type")
        self.set_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")

    def options(self, *args, **kwargs):
        self.set_status(204)
        self.finish()

class MainHandler(BaseHandler):
    def get(self):
        self.write("COVID-19 Dashboard API")

class Login(BaseHandler):
    def post(self):
        data = json.loads(self.request.body)
        email = data.get("email")
        password = data.get("password")
        connection = get_connection()
        print(email,password)
        if email and password:
            with connection.cursor() as cursor:
                sql = "SELECT * FROM users WHERE email=%s AND password=%s"
                cursor.execute(sql, (email, password))
                user = cursor.fetchone()
            print(user)
            if user:
                print(email)
                token = generate_token(email)
                self.write({"status": "success", "message": "Login successful", "token": token,"user":user})
                print(token)
            else:
                self.write({"status": "failure", "message": "Invalid username or password"})
            connection.close()
        else:
            self.write({'status':'failure','message':'Please Enter the Complete Details'})

class Signup(BaseHandler):
    def post(self):
        data = json.loads(self.request.body)
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        connection = get_connection()
        with connection.cursor() as cursor:
            sql = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
            cursor.execute(sql, (username, email, password))
            connection.commit()
        connection.close()
        
otpstore = {}
class SendEmail(BaseHandler):
    async def post(self):
        data = json.loads(self.request.body)
        email = data.get("email")
        connection = get_connection()
        
        with connection.cursor() as cursor:
            sql = "SELECT * FROM users WHERE email=%s"
            cursor.execute(sql, (email,))
            user = cursor.fetchone()
        
        if user:
            otp = "".join([str(random.randint(0, 9)) for _ in range(6)])

            port = 465 
            smtp_server = "smtp.gmail.com"
            sender_email = "thomas.webeqt@gmail.com" 
            global receiver_email
            receiver_email = email
            otpstore[receiver_email] = otp
            
            password = "ulumouifaftzlhef"
            message = f"From: 'M198 server'\n\nSubject: Hi Thomas here\n\nyour otp for reset password is {otp}"
            
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
                server.login(sender_email, password)
                server.sendmail(sender_email, receiver_email, message)
                
            self.write({"status": "success", "message": "success"})
        else:
            self.write({"status": "error", "message": "Email not registered"})
       
        connection.close()

class Verify(BaseHandler):
    def post(self):
        data = json.loads(self.request.body)
        otp = data.get('otp')
        
        if otpstore.get(receiver_email) == otp:
            self.write({"status": "success", "message": "OTP verified"})
        else:
            self.write({"status": "error", "message": "Invalid OTP"})

class Update(BaseHandler):
    def post(self):
        data = json.loads(self.request.body)
        email = data.get("email")
        password = data.get("password")
        connection = get_connection()
        if email and password:
            with connection.cursor() as cursor:
                sql = "UPDATE users SET password = %s WHERE email = %s"
                cursor.execute(sql, (password, email))
                connection.commit() 
            connection.close()
            self.write({"status": "success", "message": "Password updated successfully"})
        else:
            self.write({'status':'failure','message':'Enter the Correct details'})


class CountriesHandler(BaseHandler):
    def get(self):
        url = f"https://covid-193.p.rapidapi.com/countries"
        headers = {
            "X-RapidAPI-Key": "6fa9f667b1msh4b1f76ed0902d25p1ff9a9jsn9a6be53e99bd",
            "X-RapidAPI-Host": "covid-193.p.rapidapi.com"
        }
        response = requests.get(url, headers=headers)  
        res=response.json()
        self.write(res)

class StatisticsHandler(BaseHandler):
    def get(self):
        print('stats')
        temp=(self.request.headers.get("Authorization"))
        l=temp.split(' ')
        token=l[1]
        print(token)
        if token:
            print('token')  
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            print(payload)   
            if payload:       
                try:
                    country = self.get_argument("country")
                    url = f"https://covid-193.p.rapidapi.com/statistics"

                    headers = {
                        "X-RapidAPI-Key": "6fa9f667b1msh4b1f76ed0902d25p1ff9a9jsn9a6be53e99bd",
                        "X-RapidAPI-Host": "covid-193.p.rapidapi.com"
                    }
                    response = requests.get(url, headers=headers)  
                    countries=response.json()
                    stock = countries['response']
                    for x in stock :
                        if x['country'] == country:
                            self.write({"status":"success","data":x})
                    print('It is in Service')
                except jwt.ExpiredSignatureError:
                    self.write({"status":"failure","message":"Token has expired"})
                except jwt.InvalidTokenError:
                    self.write({"status":"failure","message":"Invalid token"})
        else:
            self.write({"status":"failure","message":"Token is missing"})

        
class HistoryHandler(BaseHandler):
    def get(self):
        print('Hist')
        temp=(self.request.headers.get("Authorization"))
        l=temp.split(' ')
        token=l[1]
        print(token)
        if token:
            print('histtok')
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            print(payload)
            try:
                country = self.get_argument("country")
                day = self.get_argument("day")
                url = f"https://covid-193.p.rapidapi.com/history?country={country}&day={day}"

                headers = {
                    "X-RapidAPI-Key": "6fa9f667b1msh4b1f76ed0902d25p1ff9a9jsn9a6be53e99bd",
                    "X-RapidAPI-Host": "covid-193.p.rapidapi.com"
                }
                response = requests.get(url, headers=headers)
                res=response.json()
                self.write({"status":"success","message":"Token has created","content":res})
            except jwt.ExpiredSignatureError:
                self.write({"status":"failure","message":"Token has expired"})
            except jwt.InvalidTokenError:
                self.write({"status":"failure","message":"Invalid token"})
        else:
            self.write({"status":"failure","message":"Token is missing"})

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/countries", CountriesHandler),
        (r"/statistics", StatisticsHandler),
        (r"/history", HistoryHandler),
        (r"/login", Login),
        (r"/signup", Signup),
        (r"/sendemail",SendEmail),
        (r"/verify",Verify),
        (r"/update",Update),

    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8891)
    print("Server is running at http://localhost:8891")
    print("APP in")
    tornado.ioloop.IOLoop.current().start()