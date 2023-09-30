import { useState, useEffect } from "react";
import "./style/index.css";
import { getContacts, getUSContacts } from "../data/apiActions";

const Problem2 = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("Model-A");
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const getAllContactData = async () => {
      const data = await getContacts();
      setItems(data.results);
    };

    const getUsContactData = async () => {
      const data = await getUSContacts("United States");
      setItems(data.results);
    };

    if (title === "Model-A") {
      getAllContactData();
    } else if (title === "Model-B") {
      getUsContactData();
    }
  }, [getContacts, getUSContacts, setTitle, title]);

  const modelA = () => {
    setTitle("Model-A");
  };

  const modelB = () => {
    setTitle("Model-B");
  };

  

  const handleChecked = (e) => {
    if (e.target.checked) {
      const check = items.filter((item) => item.id % 2 === 0);
      setItems(check);
      setCheck(true)
    }
  };
  
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        {/* Button section */}
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline btn-a"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            type="button"
            onClick={modelA}>
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline btn-b"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            type="button"
            onClick={modelB}>
            US Contacts
          </button>
        </div>

        {/* model section */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  {title}
                </h1>
                <button
                  type="button"
                  className="btn btn-c"
                  data-bs-dismiss="modal">
                  Close
                </button>
              </div>
              <div className="modal-body">
                <div className="search-filter">
                  <input
                    type="text"
                    placeholder="search contact..."
                    className="ps-2"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="table-sec">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Phone</th>
                        <th>Country</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items
                        .filter((item) => {
                          return search.toLocaleLowerCase() === ""
                            ? item
                            : item.phone.toLocaleLowerCase().includes(search);
                        })
                        .map(({ id, phone, country }) => {
                          return (
                            <tr key={id}>
                              <th> {id} </th>
                              <td>{phone}</td>
                              <td>
                                {" "}
                                {typeof country === "object"
                                  ? country.name
                                  : country}{" "}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="checkbox"
                  onChange={handleChecked}
                  onClick={() => setItems(items)}
                />
                <label htmlFor="">Only even</label>
                <button
                  type="button"
                  className="btn btn-c"
                  data-bs-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem2;
