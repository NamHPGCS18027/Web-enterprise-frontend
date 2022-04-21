import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import Navbar from './Navbar';
import {Url} from './URL.js'
import PostDetail from './Postdetail/PostDetail';
import { Link } from 'react-router-dom';

function PostPopular() {
    const [postHome, setpostHome] = useState([]);
    const [errorMes,seterrorMes] = useState('No Posts Avalaible')
    const [detailopen, setdetailopen] = useState(false)
    const [homePost, sethomePost] = useState({})
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(Url+"/api/Posts/GetAllPostsSortedByView", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.status)
                }
            })
            .then(data => {
                if(data.length !== 0){
                    setpostHome(data)
                }else{
                    seterrorMes(data)
                }
                // setpostHome(data)
            })
            .catch(error => console.log('error', error));
    }, [])

    const handelView = (data) => {
        setdetailopen(true)
        sethomePost(data)
    }
    const listHomepost = postHome.map(data => (
        <div className="PostContainer" key={data.postId}>
            <div className="titleCloseBtn">
            </div>
            <header id='header'>
                <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet' />
                <div className="header_posts">
                    <i className='bx bx-user-circle icon'></i>
                {data.isAnonymous === false ? 
                <div className="userposts_name">
                        <span className="name_userposts">{data.username}</span>
                    <div className='day'>
                        <div className='day-sumit'>{data.createdDate}</div>
                    </div>
                </div> 
                :
                <div className="userposts_name">
                        <span className="name_userposts">Anonymous</span>
                    <div className='day'>
                        <div className='day-sumit'>{data.createdDate}</div>
                    </div>
                </div>
                }
                </div>
            </header>
            <div className="Category">
                <span className="TopicName">{data.listCategoryName}</span>
            </div>
            <div className="TitlePost">
                <p className="TopicName">Title : {data.title}</p>
            </div>
            <div className="Content">
                <span className="TopicName">Content : {data.content}</span>
            </div>
            <div className="Desc">
                <div className="iconsPost">
                    <button className='btn' onClick={() => handelView(data)} >Detail</button>

                    <span>
                        <i className='bx bx-show-alt'>
                            <span className='view'>{data.viewsCount}</span>
                        </i>
                    </span>
                </div>
            </div>
        </div>
    ))
  return (
    <div>
        <Navbar />
        <section className="home">
            <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet' />
            <div className="text">
            <Link to='/Home'><button className='Newbtn'>New</button></Link> 
               <Link to='/Popular'><button className='Mostpplbtn'>Most Popular</button></Link> 
               <Link to='/LastComment'><button className='cmtbtn'>Last Comments</button></Link> 
                <div className='showselect'>
                    <select name="show" id="showid">
                        <option value="Show1">Show 1</option>
                        <option value="Show2">Show 2</option>
                    </select>
                </div>
            </div>
            <div>
                {errorMes && listHomepost}
                {detailopen && <PostDetail setopendetail={setdetailopen} data={homePost} />}
            </div>
        </section>
    </div>
  )
}

export default PostPopular