def init_database(db, FAQ):
    topic = FAQ(faq_code = "0", question = "Could you introduce yourself?", answer = "My name is Carlos and the following are my main interests")
    db.session.add(topic)
    db.session.commit()


def get_db_dict(db, FAQ):
    '''
    This method is responsable for accessing database and retriving all of its entries, returning them
    in a list of dicts alphabetically sorted.
    '''

    db_entries = db.session.query(FAQ).order_by(FAQ.faq_code)
    db_entries_list = list(map(lambda x: {"id": x.id, "faq_code":str(x.faq_code), "question":str(x.question), "answer":str(x.answer)}, db_entries))
    
    return db_entries_list


def check_database(db, FAQ, faq_code):
    db_entries_list = get_db_dict(db, FAQ)
    db_entries = [db_dict for db_dict in db_entries_list if db_dict['faq_code'] == faq_code] + \
        [db_dict for db_dict in db_entries_list if db_dict['faq_code'].startswith("{}.".format(faq_code))]

    return db_entries

def get_single_entry(db, FAQ, faq_code):

    db_entries_list = get_db_dict(db, FAQ)
    db_entry = [db_dict for db_dict in db_entries_list if db_dict['faq_code'] == faq_code]

    return db_entry