import os
import sys
import json
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, request, abort, make_response

MAIN_FOLDER_PATH = os.path.dirname(os.path.abspath(__file__))
MODEL_FOLDER_PATH = os.path.join(MAIN_FOLDER_PATH, "model")
DATABASE_FILE_PATH = f"{MAIN_FOLDER_PATH}/DB/faq.db"

sys.path.append(MODEL_FOLDER_PATH)
from model.faq_utils import init_database, get_db_dict, check_database, get_single_entry

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{DATABASE_FILE_PATH}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
db = SQLAlchemy(app)


class FAQ(db.Model):
    __tablename__ = "faq"

    id = db.Column(db.Integer, primary_key=True)
    faq_code = db.Column(db.String)
    question = db.Column(db.String)
    answer = db.Column(db.String)


db.create_all()


@app.route("/all", methods=['GET'])
def get_all_topics():
    if db.session.query(FAQ).count() == 0:
        init_database(db, FAQ)

    db_entries_list = get_db_dict(db, FAQ)

    return json.dumps(db_entries_list)


@app.errorhandler(404)
def not_found(error):
    return make_response(json.dumps("Topic not found."), 404)


@app.route("/faq", methods=['POST'])
def add_topic():
    data = request.form.to_dict(flat=True)

    if not data['faq_code'] or not data['faq_question'] or not data['faq_answer']:
        abort(400)

    faq_code = data['faq_code']
    faq_question = data['faq_question']
    faq_answer = data['faq_answer']
    

    topic = FAQ(faq_code=faq_code, question=faq_question, answer=faq_answer)
    db.session.add(topic)
    db.session.commit()

    db_entries_dict = get_db_dict(db, FAQ)
    
    return json.dumps(db_entries_dict), 201


@app.route("/faq/<faq_code>", methods=['DELETE'])
def delete_currency(faq_code):
    faq_code = str(faq_code)
    db_entries = check_database(db, FAQ, faq_code)

    if not db_entries:
        abort(404)
    
    for topic in db_entries:
        faq_topic = db.session.query(FAQ).filter_by(faq_code=topic['faq_code']).first()
        db.session.delete(faq_topic)
        db.session.commit()

    db_entries_dict = get_db_dict(db, FAQ)
    
    return json.dumps(db_entries_dict)


@app.route("/faq/<faq_code>", methods=['PUT'])
def update_currency(faq_code):
    faq_code = str(faq_code)
    db_entry = get_single_entry(db, FAQ, faq_code)
    if not db_entry:
        abort(404)

    data = request.form.to_dict(flat=True)
    if not data['updated_answer']:
        abort(400)

    updated_answer = "{}\n\n[Edited]\n{}".format(db_entry[0]['answer'], data['updated_answer'])
        
    db.session.query(FAQ).filter_by(faq_code=faq_code).update({"answer": updated_answer})
    db.session.commit()

    db_entries_dict = get_db_dict(db, FAQ)
    
    return json.dumps(db_entries_dict)


if __name__ == "__main__":

    app.run(debug=True, host="0.0.0.0")
