import { useContext } from "react";
import { CreateContextApi } from "../../../Store/ContextApi";

const ProductItems = (props) =>{
    const contextApi = useContext(CreateContextApi);

    return (
        <>
            <table className="table">
                <tbody>
                    <tr>
                        <th>Sno</th>
                        <th>Product Img</th>
                        <th>Name</th>
                        <th>Rate</th>
                        <th>OFfprice</th>
                        <th>Type</th>
                        <th>Colorram</th>
                        <th>Action</th>
                    </tr>
                    {
                        contextApi.products.length > 0 &&
                        contextApi.products.map((item, indx) => {
                            return (
                                <tr>
                                    <td>{indx + 1}</td>
                                    <td>
                                        <img style={{width:"80px"}} src={"http://localhost:8000/images/"+item.imgPath} alt=" " />
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        {item.rate}
                                    </td>
                                    <td>
                                        {item.offprice}
                                    </td>
                                    <td>
                                        {item.type}
                                    </td>
                                    <td>
                                        {item.colorram}
                                    </td>
                                    <td>
                                        <button className="btn btn-primary me-3" onClick={()=>props.editFun(item._id)}>Update</button>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default ProductItems;