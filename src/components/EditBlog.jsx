
// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'  // use of FORM is absent it was not present.
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const EditBlog = () => {
//     // when setBlog initialize then the value will be passed/stored to variable blog 
//     const [blog, setBlog] = useState([])
//     const params = useParams()//imported params

//     const {
//         register,
//         handleSubmit,
//         watch,
//         reset,//add this used to fetchBlog()
//         formState: { errors },
//     } = useForm()

//     const [html, setHtml] = useState('')
//     const [imageId, setImageId] = useState('')
//     const navigate = useNavigate();

//     const handleFileChange = async (e) => {
//         const file = e.target.files[0]
//         const formData = new FormData();
//         formData.append("image", file)


//         const res = await fetch("http://localhost:8000/api/save-temp-image/", {
//             method: 'POST',
//             body: formData
//         });
//         const result = await res.json();
//         if (result.status == false) {
//             alert(result.errors.image)
//             e.target.value = null;
//         }
//         setImageId(result.image.id);
//     }
//     // to fetch/return the info of singleBlog when clicked to pencil/edit
//     const fetchBlog = async () => {
//         //to run this fetchBog we need useEfect()  tala xa:
//         const res = await fetch("http://localhost:8000/api/blogs/" + params.id)
//         const result = await res.json();
//         setBlog(result.data)// setBlog set the value of blog to variable blog.
//         reset(result.data)//this fills the space when we are clicking in editing
//     }

//     // whenever fetchBlogs initialize/runs the value of blog will be stored in blog variable
//     useEffect(() => {
//         fetchBlog();
//     }, [])
//     const formSubmit = async (data) => {

//         // const newData={...data,imageId}
//         data.image_Id = imageId;//shows the image in the DB

//         const res = await fetch("http://localhost:8000/api/blogs/" + params.id, {
//             method: "PUT",
//             headers: {
//                 'Content-type': 'appliacation/json'
//             },
//             body: JSON.stringify(data)
//         });
//         toast("Blog updated successfully.")// shows the icon printing this when blog created.

//         navigate('/')
//         // console.log(data);
//     }
//     return (
//         <div className='container mb-5'>
//             <div className="d-flex justify-content-between pt-5 mb-4 " >
//                 <h4>Update Blog</h4>
//                 <Link to="/ " className='btn btn-dark'>Back</Link>
//             </div>
//             <div className="card border-0 shadow-lg">

//                 <form onSubmit={handleSubmit(formSubmit)}>
//                     <div className="card-body">
//                         <div className="mb-3">
//                             <label className='form-label'><h1>Title:</h1></label>
//                             <input
//                                 {...register('title', { required: true })}
//                                 type="text"
//                                 className={`form-control ${errors.title && 'is-invalid'}`}
//                                 placeholder="Title" />
//                             {errors.title && <p className='invalid-feedback'>Title field is required</p>}
//                         </div>

//                         <div className="mb-3">
//                             <label className='form-label'><h1>Short Description:</h1></label>
//                             <textarea
//                                 {...register('shortDesc')}
//                                 className='form-control' cols="30" rows="5"></textarea>
//                         </div>

//                         <div className="mb-3">
//                             <label className='form-label'><h1>Description:</h1></label>
//                             <textarea
//                                 {...register('description')}
//                                 className='form-control' cols="30" rows="10"></textarea>

//                         </div>
//                         <div className="mb-3">
//                             <label className='form-label'><h1>Image</h1></label><br />
//                             <input type="file" onChange={handleFileChange} />
//                             <div className=''>
//                                 {
//                                     (blog.image) && <img className='w-100' src={`http://lcalhost:8000/uploads/blogs/${blog.image}`} />

//                                 }
//                             </div>
//                         </div>

//                         <div className="mb-3">
//                             <label className='form-label'><h1>Author Name:</h1></label>
//                             <input
//                                 {...register('author', { required: true })}

//                                 type="text"
//                                 className={`form-control ${errors.author && 'is-invalid'}`}
//                                 placeholder='Author' />
//                             {errors.author && <p className='invalid-feedback'>Author field is required</p>}

//                         </div>
//                         <button className='btn btn-dark'>Update</button>
//                     </div>
//                 </form>
//             </div>

//         </div>
//     )
// }

// export default EditBlog


import React, { useEffect, useState } from 'react'
import Editor from 'react-simple-wysiwyg';
import { Form, useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';


const EditBlog = () => {
    const [blog, setBlog] = useState([]);
    const params = useParams();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const [html, setHtml] = useState('');
    const [imageId, setImageId] = useState('');

    const navigate = useNavigate();

    function onChange(e) {
        setHtml(e.target.value);
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch("http://localhost:8000/api/save-temp-image/", {
            method: 'POST',
            body: formData
        });

        const result = await res.json();

        if (result.status == false) {
            alert(result.errors.image);
            e.target.value = null;
        }

        setImageId(result.image.id);
    }

    const fetchBlog = async () => {
        const res = await fetch("http://localhost:8000/api/blogs/" + params.id)
        const result = await res.json();
        setBlog(result.data);
        setHtml(result.data.description)
        reset(result.data);
    }

    const formSubmit = async (data) => {
        const newData = { ...data, "description": html, image_id: imageId }

        const res = await fetch("http://localhost:8000/api/blogs/" + params.id, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newData)
        });

        toast("Blog updated successfully.");

        navigate('/');

    }

    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <div className='container mb-5'>
            <div className="d-flex justify-content-between pt-5 mb-4">
                <h4>Edit Blog</h4>
                <a href='/' className='btn btn-dark'>Back</a>
            </div>
            <div className='card border-0 shadow-lg'>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className='card-body'>
                        <div className="mb-3">
                            <label className='form-label'>Title</label>
                            <input
                                {...register('title', { required: true })}
                                type="text"
                                className={`form-control ${errors.title && 'is-invalid'}`}
                                placeholder='Title' />
                            {errors.title && <p className='invalid-feedback'>Title field is required</p>}

                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Short Description</label>
                            <textarea
                                {...register('shortDesc')}
                                cols="30" rows="5" className='form-control'></textarea>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Description</label>
                            <Editor value={html}
                                containerProps={{ style: { height: '700px' } }}
                                onChange={onChange} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Image</label><br />
                            <input onChange={handleFileChange} type="file" />

                            <div className='mt-3'>
                                {
                                    (blog.image) && <img className='w-50' src={`http://localhost:8000/uploads/blogs/${blog.image}`} />
                                }
                            </div>

                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Author</label>
                            <input
                                {...register('author', { required: true })}
                                type="text"
                                className={`form-control ${errors.author && 'is-invalid'}`}
                                placeholder='Author' />
                            {errors.author && <p className='invalid-feedback'>Author field is required</p>}
                        </div>
                        <button className='btn btn-dark'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditBlog