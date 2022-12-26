import React, { useEffect, useState,useRef } from 'react';
import swal from 'sweetalert';
import { Editor } from '@tinymce/tinymce-react';
import ApiClient from '../apiClient';

const ContentForm = ({
  handleFormVisibilty,
  isRequesting,
  isUpdateRequesting,
  isAddForm,
  blogId,
  getData,
  singleContent
}) => {
  const [form, setForm] = useState({ title: '',meta_description:'',description:'',meta_title:'' });
  const [submitted, setSubmitted] = useState(false);


  const editorRef = useRef(null);

  useEffect(() => {
    if(blogId){
      setForm(singleContent)
    }
    
  }, [blogId, isAddForm, singleContent]);

  const handleValofEditor=(e)=>{
    e.preventDefault()
    setSubmitted(true)
    setForm({...form,description:e.target.getContent()})
    // console.log(e.target.getContent(),'here we have new val')
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    setSubmitted(true)
    // let description=''
    // if (editorRef.current) {
    //   description=editorRef.current.getContent()
    // }
  
    // setForm({...form,description:description})


    if(!form.description || !form.title || !form.meta_description || !form.meta_title){
      return
    }

    let value={
      title:form.title,
      description:form.description,
      meta_description:form.meta_description,
      meta_title:form.meta_title
    }

    if(blogId){
      ApiClient.put('/page/edit?slug='+blogId,value).then(res=>{
        if(res.data.success){
          swal('Page updated!', '', 'success');
          getData()
          handleFormVisibilty();
        }
      })
    }else{
      ApiClient.post('/page',value).then(res=>{
        if(res.success){
          swal('New Page added!', '', 'success');
          getData()
          handleFormVisibilty();
        }
      })
    }
    
    
  }

  return (
    <div className="">
      <button
        type="button"
        className="btn btn-primary mb-3"
        onClick={handleFormVisibilty}
      >
        View Content
      </button>
      <div className="card">
        <form
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate=""
        >
          <div className="card-header">
            <h4>{isAddForm ? 'Add' : 'Edit'} Content</h4>
          </div>

          <div className="card-body">
           
            <div className="row">
            <div className="form-group col-md-12">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.title}
                    onChange={e=>setForm({...form,title:e.target.value})}
                  />

                  {submitted && !form.title?<div
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      Title is required
                    </div>:<></>}
                  
                </div>

                <div className="form-group col-md-12">
                  <label>Meta Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.meta_title}
                    onChange={e=>setForm({...form,meta_title:e.target.value})}
                  />

                  {submitted && !form.meta_title?<div
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      Meta Title is required
                    </div>:<></>}
                  
                </div>

              

                <div className="form-group col-md-12">
                  <label>Description</label>
                
                    <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={form.description}
                    onChange={e=>handleValofEditor(e)}
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                      ],
                      toolbar: 'undo redo | formatselect | ' +
                      'bold italic backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                  />

                  {submitted && !form.description?<div
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      description is required
                    </div>:<></>}

               
                </div>
              

                <div className="form-group col-md-12">
                  <label>Meta Description</label>
                  <textarea
                    className="form-control"
                    value={form.meta_description}
                    onChange={e=>setForm({...form,meta_description:e.target.value})}
                  />

                  {submitted && !form.meta_description?<div
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      Meta Description is required
                    </div>:<></>}
                  
                </div>
            </div>
          </div>

          <div className="card-footer d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleFormVisibilty}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn btn-primary   ${
                isRequesting || isUpdateRequesting
                  ? 'btn-progress disabled'
                  : ''
              }`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default ContentForm;

