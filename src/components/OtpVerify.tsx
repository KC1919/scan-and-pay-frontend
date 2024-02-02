// LandingForm.jsx
import 'bootstrap/dist/css/bootstrap.min.css';

const OtpVerify = () => {

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const otpElement = document.getElementById('otp') as HTMLInputElement;
    const otp = otpElement.value;

    console.log(otp);

    e.target.reset();
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
