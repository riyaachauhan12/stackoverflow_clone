import React from 'react'
import moment from 'moment'
import { Link,useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'



import Avatar from '../../components/Avatar/Avatar'
import { deleteComment} from '../../actions/question'

const EditForm = ({question}) =>{

    const User = useSelector((state) => (state.currentUserReducer))
    const { id } = useParams()
    const dispatch = useDispatch()
    const handleDelete = (commentId, noOfComments) => {
        dispatch(deleteComment(id, commentId, noOfComments - 1))
    }
    
    
   
    return (
      

        <div>

      
            {
                question.comment.map((comment) => (
                    <div className="display-comment" key={comment._id}>
                        <p>{comment.commentBody}</p>
                        <div className="question-actions-user">
                            <div>
                                  
                                {
                                    User?.result?._id === comment?.userId && (
                                        <button type="button" onClick={() => handleDelete(comment._id, question.noOfComments )}>Delete</button>
                                    )
                                }
                            </div>
                            <div>
                                <p>commented {moment(comment.commentedOn).fromNow()}</p>
                                <Link to={`/Users/${comment.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                    <Avatar backgroundColor="lightgreen" px='8px' py='5px' borderRadius='4px'>{comment.userCommented.charAt(0).toUpperCase()}</Avatar>
                                    <div>
                                        {comment.userCommented}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
        
    )
        }


export default EditForm