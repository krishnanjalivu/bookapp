import React,{useState} from 'react'
import Backbutton from '../components/Backbutton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'



const DeleteBook = () => {
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const {id}=useParams();
  const handleDeleteBook=()=>{
    setLoading(true)
    axios.delete(`http://localhost:5555/books/${id}`)
     .then(()=>{
      setLoading(false)
      navigate('/');
     })
     .catch((error)=>{
      setLoading(false)
      alert("an error happenend")
      console.log(error);
     })
  }
  return (
    <div className='p-4'>
      <Backbutton />
      <h1 className='text-3x1 my-4'>Delete Book</h1>
      {loading ? (<Spinner/>):''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-x1 w-[600px] p-8 mx-auto'>
        <h3 >Are you sure you want to delete this book?</h3>
      
      <button onClick={handleDeleteBook} className='p-4 bg-red-600 text-white m-8 w-full'>
       Yes,Delete it
      </button>
      </div>
    </div>
  )
}

export default DeleteBook
