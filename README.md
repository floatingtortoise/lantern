# Run Backend

**First time set up**

delete the "backend/venv" file, then:

```
cd backend
python3 -m venv venv
source venv/bin/activate
touch server.py
pip3 install flask
pip3 install flask-cors
```

**Run after settting up**

```
cd backend
python3 server.py
```
**URL for backend test**

It's running on: http://127.0.0.1:8080

But to see the test json message, go to: http://127.0.0.1:8080/api/home

# Run Frontend
```
cd frontend
npm run dev
```

<img width="956" alt="Screenshot 2024-04-07 at 11 23 10 PM" src="https://github.com/floatingtortoise/lantern/assets/97700939/7bda775d-d14a-44c6-8929-e4a59564385f">

