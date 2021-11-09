# run venv
source env/bin/activate

# installing
TRY: \
python3 -m pip install -r requirements.txt

OR: \
python3 -m pip install --upgrade pip \
python3 -m pip install flask \
pip install python-dotenv \
pip install psycopg2 \
pip install -U flask-cors

# run
python app.py
