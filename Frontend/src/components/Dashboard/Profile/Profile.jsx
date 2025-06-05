import "./Profile.css";

const Profile = () => {
  return (
    <div className="Profile">
      <aside>
        <div className="user mb-3">
          <div>
            <img
              className="img-user"
              src="/images/User-Profile-PNG-Image.png"
              alt="User"
            />
          </div>
          <div className="user-name">
            <p className="hello">Hello,</p>
            <p className="name-text">User</p>
          </div>
        </div>

        <div className="side-profile">
            
          <div className="d-flex gap-3 side-profile-secs">
            <i class="fas fa-box mt-1"></i>
            <h5>My orders</h5>
          </div>

          <div className=" side-profile-secs">
            <div className="d-flex">
              <i class="fas fa-user-circle me-3 mt-1"></i>
              <h5>Account settings</h5>
            </div>
            <ul className="mb-0">
              <li className="lists">Personal information</li>
              <li className="lists">Manage addresses</li>
            </ul>
          </div>

          <div className=" side-profile-secs">
            <div className="d-flex">
              <i class="fas fa-wallet me-3 mt-1"></i>
              <h5>Payments</h5>
            </div>

            <ul className="mb-0">
              <li className="lists">Gift Cards</li>
              <li className="lists">Saved UPI</li>
              <li className="lists">Saved Cards</li>
            </ul>
          </div>

          <div className="d-flex side-profile-secs cursor">
            <i className="ri-logout-circle-r-line user-icon me-2 mt-1"></i>
            <h5 className="">Log Out</h5>
          </div>
        </div>
      </aside>

      <section>
        <form className="profile-details">
          <div className="name-section mb-5 form-part">
            <span className="sections fw-semibold">Personal Information</span>
            <button className="btns">Edit</button>
            <button className="btns">Cancle</button>

            <div className="form-gap mb-4">
              <input
                className="me-4 input-field"
                placeholder="First Name"
                type="text"
              />
              <input
                className="input-field me-4"
                placeholder="Last Name"
                type="text"
              />
              <button className="save-btn">Save</button>
            </div>

            <span className="fw-semibold">Your Gender</span>
            <div className="gender-section d-flex mt-2">
              <div className="me-3">
                <label htmlFor="Male"></label>
                <input className="radio" type="radio" />
                <span className="ms-2">Male</span>
              </div>

              <div className="me-3">
                <label htmlFor="Female"></label>
                <input className="radio" type="radio" />
                <span className="ms-2">Female</span>
              </div>
            </div>
          </div>

          <div className="email-section mb-5 form-part">
            <span className="sections fw-semibold">Your emailr</span>
            <button className="btns">Edit</button>
            <button className="btns">Cancle</button>

            <div className="form-gap">
              <input
                placeholder="example@gmail.com"
                className="input-field me-4"
                type="email"
              />
              <button className="save-btn">Save</button>
            </div>
          </div>

          <div className="contact-section form-part">
            <span className="sections fw-semibold">Contact number</span>
            <button className="btns">Edit</button>
            <button className="btns">Cancle</button>

            <div className="form-gap">
              <input
                placeholder="+91 1234567890"
                className="input-field me-4"
                type="number"
              />
              <button className="save-btn">Save</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Profile;
