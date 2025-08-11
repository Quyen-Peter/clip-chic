import Sidebar from "../component/Sidebar";
import Header from "../component/Header";


const Productions =() =>{

  const handleChange = (q:{top:"best"|"new"|null; collection:string|null; color:string|null; price:string|null})=>{
    // gọi API của bạn ở đây
    // ví dụ: fetch(`/api/products?top=${q.top||""}&collection=${q.collection||""}&color=${q.color||""}&price=${q.price||""}`)
    console.log("query:", q);
  };
  return(
    <div>
      <Header/>
      <Sidebar onChange={handleChange}/>
    </div>
  )
}

export default Productions;