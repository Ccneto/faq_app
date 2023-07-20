import {useState} from "react"
import {BsPlus} from "react-icons/bs"
import {FaMinus} from "react-icons/fa"

function SingleQuestion( {question, answer} ) {
    const [showAnswer, setShowAnswer] = useState(false)

    return (
        <div className="text">
            <div className="flex items-center justify-between border-2 p-3 my-2 rounded-md">
                <p onClick={() => setShowAnswer(!showAnswer)} className="text-lg cursor-pointer">{question}</p>
                {
                    showAnswer ? <button onClick={() => setShowAnswer(!showAnswer)}><FaMinus /></button>:
                    <button onClick={() => setShowAnswer(!showAnswer)}><BsPlus /></button>
                }
            </div>
            
            {showAnswer && <p>{answer}</p>}
        </div>
    );
  }
  
  export default SingleQuestion;