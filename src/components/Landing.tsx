// LandingForm.jsx
import 'bootstrap/dist/css/bootstrap.min.css';

const Landing = () => {

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const nameElement = document.getElementById('name') as HTMLInputElement;
    const name = nameElement.value;

    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const phone = phoneElement.value;

    const userData = {
      name,
      phone
    };


    e.target.reset();
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
