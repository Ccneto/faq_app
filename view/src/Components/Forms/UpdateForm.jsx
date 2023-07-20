import axios from 'axios'
import Select from '../Select';
import React, { useState } from 'react'
import { format } from 'react-string-format';


function update_validate(faq_code) {
    if (faq_code === "" || faq_code === "0") {
        if (faq_code === "") {
            alert("Please choose a topic to be updated");
        }

        else {
            alert("Topic 0 cannot be updated");
        }
        return false
    }

    else {
        return window.confirm("Are you sure you want to update " + faq_code + " answer in the database?");
    }

}


function UpdateForm(props) {
    const { db_entries } = props;
    const [faqCode, setFaqCode] = useState("");
    const [faqAnswer, setFaqAnswer] = useState("");

    const handleCodeChange = (childData) => {
        setFaqCode(childData);
    }

    const handleAnswerChange = event => {
        setFaqAnswer(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (update_validate(faqCode)) {
            axios.put(format("/faq/{0}", faqCode), format('faq_code={0}&updated_answer={1}', faqCode, faqAnswer))
            .then(res => {
                console.log(res);
                console.log(res.data);
            })

            window.location.reload();
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <table id="update_table" class="table">
                <caption>Update Topic</caption>
                <tbody>
                    <tr>
                        <td>Topic code:</td>
                        <td><Select id="update_faq_select" db_entries={db_entries} parentCallback={handleCodeChange} /></td>
                    </tr>

                    <tr>
                        <td>Updated topic answer:</td>
                        <td><input id="updated_faq_value" name="updated_faq_value" class="input" placeholder="" onChange={handleAnswerChange} /></td>
                    </tr>

                    <tr>
                        <td colspan="2"><input type="submit" class="bg-transparent hover:bg-black-500 text-black-700 font-semibold hover:text-red py-2 px-4 border border-black-500 hover:border-transparent rounded" value="Update" /></td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}

export default UpdateForm
