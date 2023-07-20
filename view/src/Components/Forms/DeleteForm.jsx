import axios from 'axios';
import Select from '../Select';
import React, { useState } from 'react';
import { format } from 'react-string-format';


function delete_validate(faq_code) {
    if (faq_code === "" || faq_code === "0") {
        if (faq_code === "") {
            alert("Please choose a topic to be deleted");
        }

        else {
            alert("Topic 0 cannot be deleted");
        }
        return false
    }

    else {
        return window.confirm("Are you sure you want to delete " + faq_code + " from the database?");
    }

}


function DeleteForm(props) {
    const { db_entries } = props;
    const [faqCode, setFaqCode] = useState("");

    const handleCodeChange = (childData) => {
        setFaqCode(childData);
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (delete_validate(faqCode)) {
            axios.delete(format("/faq/{0}", faqCode))
            .then(res => {
                console.log(res);
                console.log(res.data);
            })

            window.location.reload();
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <table id="delete_table" class="table">
                <caption>Delete Topic</caption>
                <tbody>
                    <tr>
                        <td>Topic code: 
                            <div class="tooltip">
                                &#x1F6C8;
                                <span class="tooltiptext">Any chosen topic will be deleted along with all its subtopics</span>
                            </div>
                        </td>
                        <td><Select id="deleted_faq_select" db_entries={db_entries} parentCallback={handleCodeChange} /></td>
                    </tr>
                    <tr>
                        <td colspan="2" class="td2"><input type="submit" class="bg-transparent hover:bg-black-500 text-black-700 font-semibold hover:text-red py-2 px-4 border border-black-500 hover:border-transparent rounded" value="Delete" /></td>
                    </tr>
                </tbody>
            </table>
        </form>
        )
}

export default DeleteForm
