import { Link } from "react-router-dom";
import { TProduct } from "../../interfaces/TProducts";

type Props = {
  products: TProduct[];
};

const Dashboard = ({ products }: Props) => {
  return (
    <div>
      <h1>Hello, admin</h1>
      <Link to="/admin/add" className="btn btn-primary">
        Add new product
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.title}</td>
              <td>{i.price}</td>
              <td>{i.description}</td>
              <td>
                <button className="btn btn-danger">Delete</button>
                <Link to={`/admin/edit/${i.id}`} className="btn btn-warning">
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
