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
But to see json, go to: http://127.0.0.1:8080/api/home

# Run Frontend
```
cd frontend
npm run dev
```

