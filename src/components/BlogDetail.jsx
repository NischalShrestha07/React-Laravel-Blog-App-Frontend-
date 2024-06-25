// import React, { useEffect, useState } from 'react'
// import { Link, useParams } from 'react-router-dom'

// const BlogDetail = () => {
//     const [blog, setBlog] = useState([]);
//     const params = useParams();


//     const fetchBlog = async () => {

//         const res = await fetch("http://localhost:8000/api/blogs/" + params.id)
//         const result = await res.json();
//         setBlog(result.data)

//     }
//     useEffect(() => {
//         fetchBlog();
//     }, [])
//     return (
//         <div className="container">
//             <div className="d-flex justify-content-between pt-5 mb-4 " >
//                 <h2>{blog.title}</h2>
//                 <div>
//                     <Link to="/" className='btn btn-dark'>Back to Blogs</Link>
//                 </div>
//             </div>
//             <div className="row">
//                 <div className="col-md-12">
//                     <p>By <strong>{blog.author} </strong>on {blog.date}</p>
//                     {
//                         (blog.image) && <img className='w-100' src={`http://localhost:8000/uploads/blogs/${blog.image}`} />

//                     }


//                     <div className='mt-5' dangerouslySetInnerHTML={{ __html: blog.description }}>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default BlogDetail
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const BlogDetail = () => {
    const [blog, setBlog] = useState([]);
    const params = useParams();

    const fetchBlog = async () => {
        const res = await fetch("http://localhost:8000/api/blogs/" + params.id)
        const result = await res.json();
        setBlog(result.data);
    }


    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <div className='container'>
            <div className="d-flex justify-content-between pt-5 mb-4">
                <h2>{blog.title}</h2>
                <div>
                    <Link href='/' className='btn btn-dark'>Back to blogs</Link>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <p>by <strong>{blog.author}</strong> on {blog.date}</p>

                    {
                        (blog.image) && <img className='w-50' src={`http://localhost:8000/uploads/blogs/${blog.image}`} />
                    }

                    <div className='mt-5' dangerouslySetInnerHTML={{ __html: blog.description }}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetail