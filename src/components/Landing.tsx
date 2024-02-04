// LandingForm.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';

const Landing = () => {

  const navigate = useNavigate();

  const { table_number } = useParams();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const nameElement = document.getElementById('name') as HTMLInputElement;
    const name = nameElement.value;

    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const phone = phoneElement.value;

    const userData = {
      name,
      phone,
      table_number
    };

    console.log(userData);

    e.target.reset();

    const response = await fetch(`http://localhost:3000/api/v1/users/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const jsonResp = await response.json();

    console.log(jsonResp);

    if (jsonResp.status === true) {
      navigate(`/user/verify-otp/${table_number}/${jsonResp.content.data.id}`);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-5">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Start Ordering</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Mobile
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control"
                    required
                    minLength={10}
                    maxLength={10}
                  />
                </div>
                <button type="submit" className="btn btn-danger w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

// KC
