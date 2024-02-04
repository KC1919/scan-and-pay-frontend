// LandingForm.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';

const OtpVerify = () => {

  const navigate = useNavigate();

  const { table_number, id: user_id } = useParams();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const otpElement = document.getElementById('otp') as HTMLInputElement;
    const otp = otpElement.value;

    console.log(otp);

    e.target.reset();

    const userData = {
      otp,
      table_number,
      user_id
    };

    const response = await fetch('http://localhost:3000/api/v1/users/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
      credentials: 'include'
    });

    const jsonResp = await response.json();

    console.log(jsonResp);

    if (jsonResp.status === true) {
      navigate('/menu');
    }

  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-5">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Verify OTP</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label">
                    OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    className="form-control"
                    required
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

export default OtpVerify;

// KC
