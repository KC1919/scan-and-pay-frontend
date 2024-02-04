// RegisterForm.jsx
import "bootstrap/dist/css/bootstrap.min.css";

const Table = () => {
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    // Add your registration logic here
    const tableElement = document.getElementById(
      "tableNumber"
    ) as HTMLInputElement;
    const tableNumber = tableElement.value;

    e.target.reset();

    const tableData = {
      tableNumber,
    };

    const response = await fetch("http://localhost:3000/api/v1/tables/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tableData),
      credentials: 'include',
    });

    const jsonResp = await response.json();

    console.log(jsonResp);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-5">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Create Table</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Table Number
                  </label>
                  <input
                    type="text"
                    id="tableNumber"
                    name="tableNumber"
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-danger w-100">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;

// KC
