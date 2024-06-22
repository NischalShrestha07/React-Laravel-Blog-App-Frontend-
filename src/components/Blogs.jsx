import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import { Link } from 'react-router-dom'

const Blogs = () => {
    const [blogs, setBlogs] = useState();
    const [keyword, setKeyword] = useState('');

    const fetchBlogs = async () => {
        const res = await fetch("http://localhost:8000/api/blogs")

        const result = await res.json()
        setBlogs(result.data)
        // console.log(result);

    }
    const searchBlogs = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:8000/api/blogs?keyword=' + keyword);
        const result = await res.json();
        setBlogs(result.data)
    }
    const resetSearch = () => {
        fetchBlogs();//fetches all blogs
        setKeyword('')//search bar will be empty after the reset

    }

    useEffect(() => {
        fetchBlogs();
    }, []);
    return (
        <div className="container">
            <div className="d-flex justify-content-center pt-5 mb-4 " >
                <form onSubmit={(e) => searchBlogs(e)}>
                    <div style={{ display: 'flex' }}>
                        <input style={{ padding: '15px', fontSize: '25px', borderRadius: '15px' }} type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} className='form-control' placeholder='Search Blogs' />
                        <button style={{ background: 'black', color: 'white', padding: '1px 20px', fontFamily: 'cursive', fontSize: '25px' }}>Search</button>

                        <button style={{ marginLeft: "20px", background: 'green', color: 'white', padding: '1px 20px', fontFamily: 'cursive', fontSize: '25px' }} onClick={() => resetSearch()}>Reset</button>

                    </div>
                </form>
            </div>


            <div className="d-flex justify-content-between pt-5 mb-4 " >
                <h4>Blogs</h4>
                <Link to="/create" className='btn btn-dark'>Create</Link>
            </div>
            <div className="row">

                {
                    (blogs) && blogs.map((blog) => {
                        return (<BlogCard blogs={blogs} setBlogs={setBlogs} blog={blog} key={blog.id} />)//here blog is passed to use this in blogCard.jsx which is passed inside barces

                    })
                }



            </div>
        </div>
    )
}

export default Blogs
