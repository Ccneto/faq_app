import React, { useState } from 'react'
import SingleQuestion from './SingleQuestion'

function Table(props) {
  const {id, className, db_entries} = props
  const [searchItem, setSearchItem] = useState("");
  const table_header = ["Topic", "Subject"]
  
  const handleChange = event => {
    setSearchItem(event.target.value);
  };

  return (
    <table id={id} className={className}>
        <caption>FAQ</caption>
        <thead>
          <tr>
            {table_header.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  {head}
              </th>
            ))}
          </tr>
        </thead>
        <input type="search" id="topic_input" className="topic_search" placeholder="Search for topic..." onChange={handleChange} />
        <tbody>
          {
            db_entries.filter(item => {
              if (searchItem === '') {
                return item;
              } 
              else if (item.question.includes(searchItem) || item.answer.includes(searchItem)) {
                return item;
              }
            }).map((item) => (
              <tr key={item.id}>
                <td className="p-4">{item.faq_code}</td>
                <td><SingleQuestion question={item.question} answer={item.answer} /></td>
              </tr>
            ))
          }
        </tbody>
    </table>
  )
}

export default Table