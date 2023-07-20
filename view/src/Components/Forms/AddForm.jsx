import axios from 'axios';
import Select from '../Select';
import React, { useState } from 'react';
import { format } from 'react-string-format';


function generate_child_faq_code(db_entries, faqCode) {
    const parent_array = faqCode.split(".")
    const parent_level = parseInt(parent_array.length)
    
    var child_array = []
    var children_array = []
    var last_faqCode_snipets = []
    var last_faqCode_index = 0
    var new_faqCode = ""

    if (faqCode === "" ) {
        alert("Please choose a parent topic.");
    }

    else {
        for (var i=0; i< db_entries.length; i++) {
            if (db_entries[i].faq_code.startsWith(faqCode + ".")) {
                children_array.push(db_entries[i].faq_code)
            }
        }

        if (children_array.length === 0) {
            new_faqCode = faqCode + ".1"
        }

        else {
            for (var j=0; j< children_array.length; j++) {
                child_array = children_array[j].split(".")

                if (child_array.length !== (parent_level + 1)) {
                    children_array.splice(j, 1)
                }
            }

            last_faqCode_snipets = children_array[children_array.length - 1].split(".")
            last_faqCode_index = parseInt(last_faqCode_snipets[last_faqCode_snipets.length - 1]) + 1
            new_faqCode = faqCode + "." + last_faqCode_index
        }
    }

    return new_faqCode;
}

function generate_parent_faq_code(db_entries) {
    var new_faqCode = ""
    var parent_entry = []
    var parent_array = []

    for (var i=0; i< db_entries.length; i++) {
        parent_entry = db_entries[i].faq_code.split(".")

        if (parent_entry.length === 1) {
            parent_array.push(db_entries[i].faq_code)
        }
    }

    if (parent_array.length === 0) {
        new_faqCode = "1"
    }

    else{
        new_faqCode = parseInt(parent_array[parent_array.length - 1]) + 1
        new_faqCode = new_faqCode.toString()
    }

    return new_faqCode

}

function generate_faq_code(db_entries, faqCode) {
    if (window.confirm("Do you wish to create a new parent topic?")) {
        return generate_parent_faq_code(db_entries)
    }

    else {
        return generate_child_faq_code(db_entries, faqCode)
    }
}

function AddForm(props) {
    const { db_entries } = props;
    const [faqCode, setFaqCode] = useState("");
    const [faqQuestion, setFaqQuestion] = useState("");
    const [faqAnswer, setFaqAnswer] = useState("");

    var new_faqCode = useState("");

    const handleCodeChange = (childData) => {
        setFaqCode(childData);
    }

    const handleQuestionChange = event => {
        setFaqQuestion(event.target.value);
    }

    const handleAnswerChange = event => {
        setFaqAnswer(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();

        new_faqCode = generate_faq_code(db_entries, faqCode)

        if (new_faqCode !== "") {
            axios.post("/faq", format('faq_code={0}&faq_question={1}&faq_answer={2}', new_faqCode, faqQuestion, faqAnswer))
            .then(res => {
                console.log(res);
                console.log(res.data);
            })

            window.location.reload();
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <table id="add_table" class="table">
                <caption>Add Topic</caption>
                <tbody>
                    <tr>
                        <td>Topic code:</td>
                        <td><Select id="added_faq_select" db_entries={db_entries} parentCallback={handleCodeChange} /></td>
                    </tr>

                    <tr>
                        <td>Question:</td>
                        <td><input id="added_question_value" name="added_question_value" class="input" onChange={handleQuestionChange} /></td>
                    </tr>

                    <tr>
                        <td>Answer:</td>
                        <td><input id="added_answer_value" name="added_answer_value" class="input" onChange={handleAnswerChange} /></td>
                    </tr>

                    <tr>
                        <td colspan="2" class="td2"><input type="submit" class="bg-transparent hover:bg-black-500 text-black-700 font-semibold hover:text-red py-2 px-4 border border-black-500 hover:border-transparent rounded" value="Add" /></td>
                    </tr>
                </tbody>
            </table>
        </form>
    )   
}

export default AddForm
