import { useEffect, useState,  } from 'react'
import {Link, useNavigate, useParams} from "react-router"
import api from "../lib/axios"
import toast from "react-hot-toast"
import { LoaderIcon, ArrowLeftIcon, TrashIcon, Trash2Icon } from "lucide-react"

const NoteDetailPage = () => {
  const [notes, setNotes] = useState(null)
  const [loading, setLoading] = useState(true)
  const [save, setSave] = useState("")

  const navigate = useNavigate()
  const { id} = useParams();

  useEffect (() => {
    const fetchNote= async () => {
        try {
          const res = await api.get(`/notes/${id}`)
          setNotes(res.data)
        } catch (error) {
          toast.error("Failed to fetch notes")
          console.log("Error in fetching notes", error)
        }finally {
          setLoading(false)
        }
    }
     fetchNote();

  }, [id])

  const handleDelete = async () => {
      if(!window.confirm("Are you sure you want to delete this note?")) return;
try {
  await api.delete(`/notes/${id}`)
  toast.success("Note deleted successfully")
  navigate("/");
} catch (error) {
  console.log("Error in handleDelete", error);
  toast.error("Failed to delete error")
  
}

  }

  const handleSave = async () => {
      if(!notes.title.trim() || !notes.content.trim()){
        toast.error("please add a title or content")
        return;

        
      }
      setSave(true);

      try {
        await api.put(`/notes/${id}`, notes);
        toast.success("Note Updated Successfully")
        navigate("/")
      } catch (error) {
        console.log("Error in handleSubmit", error);
        toast.error("Failed to update note")
      } finally {
        setSave(false)
      }
  }
if(loading){
  return(
    <div className='flex items-center justify-center min-h-screen bg-base-200'>
      < LoaderIcon className='animate-spin size-10' />
    </div>
  )
}


  return (
    <div className='min-h-screen bg-base-200'>
      <div className='px-4 py-8 mx-auto contaier'>
        <div className="max-w-2xl mx-auto">
        <div className='flex items-center justify-between mb-6'>
        < Link to="/" className='btn btn-ghost' > 
        < ArrowLeftIcon className="w-5 h-5" />
        Back to notes
        </Link>
        <button onClick={handleDelete} className='btn btn-error btn-outline'>
          < Trash2Icon className='w-5 h-5'/>
          Delete Note
        </button>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="mb-4 form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={notes.title}
                    onChange={(e) => setNotes({...notes, title : e.target.value})}
                  />
                </div>

                <div className="mb-4 form-control">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder="Add Content"
                    className="h-32 textarea textarea-bordered"
                    value={notes.content}
                    onChange={(e) => setNotes({...notes, content : e.target.value})}
                  />

                  <div className="justify-end card-actions">
                    <button className='mt-4 btn btn-primary' disabled={save} onClick={handleSave}>
                      {save ? "Saving..." : "Save changes"}
                    </button>
                  </div>
                </div>
          </div>
        </div>
        </div>

      </div>
      
    </div>
  )
}

export default NoteDetailPage
