import { useState } from "react";
import Header from "../component/Header";
import SidebarBlindbox from "../component/SidebarBlindbox";

type QueryBlindbox = {
  top: "best" | "new" | null;
  collection: string | null;
  search?: string | null;
};

const Blindbox = () =>{

    const [query, setQuery] = useState<QueryBlindbox>({
        top: null,
        collection: null,
        search: null,
      });

    const handleChange = (q: QueryBlindbox) => {
    setQuery(q);
    console.log("query:", q);
  };
    return(
    <div>
        <div>
            <Header/>
        </div>
        <div>
            <div>
                <SidebarBlindbox onChange={handleChange}/>
            </div>
        </div>

    </div>
    )
}

export default Blindbox;