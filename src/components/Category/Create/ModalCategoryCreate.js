import React,{useState} from "react";
import "./ModalCategoryCreate.css";
import { Url } from "../../URL";
function ModalCategoryCreate({ setOpenModalCategoryCreate , addCate }) {
  const[CategoryName,setCategoryName]=useState('');
  const[desc,setdesc]=useState('');
   const [reloadpage,setreloadpage]= useState(false);
  const Summittag = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          "categoryName": CategoryName,
          "desc": desc
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(Url+"/api/Category/CreateTag", requestOptions)
        .then(response => response.json())
        .then(result => {
          setOpenModalCategoryCreate(false)
          addCate(CategoryName,desc)
          alert(result)
        })
        .catch(error => {
          console.log('error', error)
          setOpenModalCategoryCreate(false)
          setreloadpage(!reloadpage)
          alert('Error please try again')
        });
    }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button className="xbtn" onClick={() => {setOpenModalCategoryCreate(false);}} > X </button>
        </div>
        <div className="modaltitle">Create New Category</div>
        <div className="modalinput">
            <span className="inputtitle">Category Name</span>
            <br/>
            <input className="inputvl"  onChange={e => setCategoryName(e.target.value)}></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Description</span>
            <br/>
            <textarea className="inputvl" placeholder="Write something..."  onChange={e => setdesc(e.target.value)}></textarea>
        </div>
        

        <div className="Modalfooter">
          <button className="cancelBtn" onClick={() => {setOpenModalCategoryCreate(false);}} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn" onClick={Summittag}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default ModalCategoryCreate