import {Link} from "react-router-dom";
import Button from "../../../components/Button/index.jsx";
import H3 from "../../../components/Text/H3/index.jsx";

function SingleQuiz({id, name, description}) {
    return (
        <div className='flex justify-between items-center border rounded p-5 mt-5'>
            <div>
                <H3>{name}</H3>
                <p>{description}</p>
            </div>

            <div className='flex gap-2'>
                <Button>
                    <Link to={`/quiz/${id}`}>Preview</Link>
                </Button>
                <Button>
                    <Link to={`/quiz/edit/${id}`}>Edit</Link>
                </Button>
            </div>

        </div>

    )
}

export default SingleQuiz