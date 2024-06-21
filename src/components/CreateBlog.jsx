import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const CreateBlog = () => {

    const [html, setHtml] = useState('')
    const [imageId, setImageId] = useState('')
    const navigate = useNavigate();

    // function onChange(e) {
    //     setHtml(e.target.value);
    // }

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append("image", file)


        const res = await fetch("http://localhost:8000/api/save-temp-image/", {
            method: 'POST',
            body: formData
        });
        const result = await res.json();
        if (result.status == false) {
            alert(result.errors.image)
            e.target.value = null;
        }
        setImageId(result.image.id);
    }



    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const formSubmit = async (data) => {

        // const newData={...data,imageId}
        data.image_Id = imageId;//shows the image in the DB

        const res = await fetch("http://localhost:8000/api/blogs", {
            method: "POST",
            headers: {
                'Content-type': 'appliacation/json'
            },
            body: JSON.stringify(data)
        });
        toast("Blog added successfully.")// shows the icon printing this when blog created.
        navigate('/')
        // console.log(data);
    }
    return (
        <div className='container mb-5'>
            <div className="d-flex justify-content-between pt-5 mb-4 " >
                <h4>Create Blog</h4>
                <Link to="/ " className='btn btn-dark'>Back</Link>
            </div>
            <div className="card border-0 shadow-lg">

                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className='form-label'><h1>Title:</h1></label>
                            <input
                                {...register('title', { required: true })}
                                type="text"
                                className={`form-control ${errors.title && 'is-invalid'}`}
                                placeholder="Title" />
                            {errors.title && <p className='invalid-feedback'>Title field is required</p>}
                        </div>

                        <div className="mb-3">
                            <label className='form-label'><h1>Short Description:</h1></label>
                            <textarea
                                {...register('shortDesc')}
                                className='form-control' cols="30" rows="5"></textarea>
                        </div>

                        <div className="mb-3">
                            <label className='form-label'><h1>Description:</h1></label>
                            <textarea
                                {...register('description')}
                                className='form-control' cols="30" rows="10"></textarea>

                        </div>
                        <div className="mb-3">
                            <label className='form-label'><h1>Image</h1></label><br />
                            <input type="file" onChange={handleFileChange} />
                        </div>

                        <div className="mb-3">
                            <label className='form-label'><h1>Author Name:</h1></label>
                            <input
                                {...register('author', { required: true })}

                                type="text"
                                className={`form-control ${errors.author && 'is-invalid'}`}
                                placeholder='Author' />
                            {errors.author && <p className='invalid-feedback'>Author field is required</p>}

                        </div>
                        <button className='btn btn-dark'>Create</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default CreateBlog
