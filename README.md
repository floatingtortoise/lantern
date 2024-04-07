How to run it?

#Backend:

##First time setup:
cd backend
python3 -m venv venv
source venv/bin/activate
touch server.py
pip3 install flask
pip3 install flask-cors

##Run:
python3 server.py

##The current url that I set (open in browser):
http://127.0.0.1:8080/api/home


#Frontend:

cd frontend
npm run dev
