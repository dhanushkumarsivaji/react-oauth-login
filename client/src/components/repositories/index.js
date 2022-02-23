import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { isEmpty } from "lodash";
import AuthContext from '../../store/context';
import Pagination from "../pagination";
import './style.css';


export default function Repositories() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const authContext = useContext(AuthContext);

  const { user } = authContext;

  useEffect(() => {
    const getData = async () => {
      if(!isEmpty(user)){
      let result = await axios.get(
        `https://api.github.com/users/${user.login}/repos`
      );
      setPosts(result.data);
      }
    };
    getData();
  }, [user]);

      // Get current posts
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    
      // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div className="card-container">
      <div className="card text-center">
        <div className="card-header">Repositories</div>
        <div className="card-body">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">S.no</th>
                <th scope="col">Repo Name</th>
                <th scope="col">Repo Type</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((val, i) => (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{val.name}</td>
                  <td>{val.type ? "Private" : "Public"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer text-muted">
        <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            currentPage={currentPage}
        />
        </div>
      </div>
    </div>
  );
}