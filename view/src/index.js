import './index.css';
import axios from 'axios'
import ReactDOM from 'react-dom';
import Table from './Components/Table';
import AddModal from './Components/Modal/AddModal'
import DeleteModal from './Components/Modal/DeleteModal'
import UpdateModal from './Components/Modal/UpdateModal'
import React from 'react';

class App extends React.PureComponent {
  state = {
    dbEntries: [],
    convertionMessage: ""
  }

  constructor(props) {
    super(props);
    this.dbEntries = React.createRef();
  }

  componentDidMount() {
    axios.get("/all")
      .then(response => {
        this.setState({
          dbEntries: response.data
        })
        return response.data
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      });
  }

  render() {
    return (
      <div className="p-5">
        <table className='main'>
          <tbody>
            <tr>
              <td colSpan="3"><Table id="faq_table" className="w-full min-w-max table-auto text-center" db_entries={this.state.dbEntries}/></td>
            </tr>

            <tr>
              <td><AddModal db_entries={this.state.dbEntries}/></td>
              <td><DeleteModal db_entries={this.state.dbEntries} /></td>
              <td><UpdateModal db_entries={this.state.dbEntries} /></td>
            </tr>

          </tbody>
        </table>
      </div>
    )
  }
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
