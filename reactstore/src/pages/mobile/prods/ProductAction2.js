import "./ProductAction.css";
import { useContext, useState } from "react";
import axios from "axios";
import ProductItems2 from "./ProductItems2";
import { CreateContextApi } from "../../../Store/ContextApi";

const ProductAction2 = () => {
  const contextApi = useContext(CreateContextApi);

  const [productInpt, setProductInpt] = useState({
    name: "",
    imgPath: "",
    colorram: "",
    rate: "",
    offprice:'',
    type:''
  });

  const [fileInpt, setFileInpt] = useState(null);
  const [imgView, setImgView] = useState(null);
  const [editID, setEditId] = useState(null);
  const [isEdit, setEdit] = useState(false);

  const onInptHandler = (event) => {
    const name = event.target.name;
    const val = event.target.value;
    if(name === "imgfile"){
      setFileInpt(event.target.files[0])
      setImgView(URL.createObjectURL(event.target.files[0]))
    }
    setProductInpt({ ...productInpt, [name]: val });
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    
    if(isEdit){
      formData.append("id", editID);
      formData.append("name", productInpt.name);
      formData.append("rate", productInpt.rate);
      formData.append("offprice", productInpt.offprice);
      formData.append("colorram", productInpt.colorram);
      formData.append("type", productInpt.type);
      if(fileInpt){
        formData.append("imageFile", fileInpt);
      }

      try{
        const response = await axios.post("http://localhost:8000/product/update-product", formData)
        console.log(response);
        contextApi.onUpdateProduct(response.data);
        setProductInpt({
          name: "",
          rate: "",
          colorram: "",
          imgfile: "",
          offprice: "",
          type:'',
        });
        setFileInpt(null)
        setImgView(null)
        setEdit(false);
        setEditId(null);
      }
      catch(err){
        console.log(err);
      }
    }else{
      formData.append("name", productInpt.name);
      formData.append("rate", productInpt.rate);
      formData.append("colorram", productInpt.colorram);
      formData.append("imageFile", fileInpt);
      formData.append("offprice", productInpt.offprice);
      formData.append("type", productInpt.type);

      try{
        const response = await axios.post("http://localhost:8000/product/add-product", formData)
        console.log(response);
        contextApi.onAddProduct(response.data);
        setProductInpt({
          name: "",
          rate: "",
          colorram: "",
          imgfile: "",
          offprice:'',
          type:''
        });
        setFileInpt(null)
        setImgView(null)
      }
      catch(err){
        console.log(err);
      }
    }

  }

  const onEdit = (id) =>{
    setEdit(true);
    setEditId(id);
    const findData = contextApi.products.find(item => item._id === id)
    setProductInpt({
      ...productInpt,
      name:findData.name,
      rate: findData.rate,
      colorram: findData.colorram,
      offprice:findData.offprice,
      type:findData.type


    })
    setImgView("http://localhost:8000/images/"+findData.imgPath)
  }


  return (
    <section className="">
      <div className="container">
        <div className="add-product-wraper mt-4">
          <div className="row">
            <div className="col-md-4">
              <div className="bx-card">
                <h2>Add Products</h2>
                <form className="product-form" onSubmit={onSubmitForm}>
                  {imgView && <img src={imgView} style={{width:"80px", marginBottom:"20px"}} />}
                  <div className="form-group mb-4">
                    <input
                      type="file"
                      placeholder="product image"
                      name="imgfile"
                      className="form-control"
                      value={productInpt.imgfile}
                      onChange={onInptHandler}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      placeholder="product name"
                      name="name"
                      className="form-control"
                      value={productInpt.name}
                      onChange={onInptHandler}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      placeholder="product rate"
                      name="rate"
                      className="form-control"
                      value={productInpt.rate}
                      onChange={onInptHandler}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      placeholder="product offprice"
                      name="offprice"
                      className="form-control"
                      value={productInpt.offprice}
                      onChange={onInptHandler}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      placeholder="product type"
                      name="type"
                      className="form-control"
                      value={productInpt.type}
                      onChange={onInptHandler}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <textarea
                      name="colorram"
                      className="form-control"
                      placeholder="colorram"
                      value={productInpt.colorram}
                      onChange={onInptHandler}
                    ></textarea>
                  </div>
                  

                  <div className="form-group mb-4">
                  {!isEdit && 
                    <button type="submit" className="btn btn-primary ms-0">
                    Add product
                  </button>
                  }
                  {isEdit && 
                    <button type="submit" className="btn btn-primary ms-0">
                    Update product
                  </button>
                  }
                    
                    
                  </div>
                </form>
              </div>
            </div>
            
            <div className="col-md-8">
              <div className="product-items bx-card">
                <ProductItems2 editFun={onEdit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductAction2;
