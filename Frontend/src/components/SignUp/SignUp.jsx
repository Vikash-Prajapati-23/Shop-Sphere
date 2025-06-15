import "./Style/SignUp.css"

const SignUp = () => {
  return (
    <div className="my-5">
      <div className=" mx-auto Login">
        <div className="card-body">
          <div className="login mx-4">
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                <i class="fa-solid fa-user"></i>
              </span>
              <input
                type="email"
                class="form-control"
                placeholder="Email id"
                aria-label="Email"
                aria-describedby="addon-wrapping"
              />
            </div>

            <div class="input-group flex-nowrap my-3">
              <span class="input-group-text" id="addon-wrapping">
                <i class="fa-solid fa-lock"></i>
              </span>
              <input
                type="Password"
                class="form-control"
                placeholder=" Create Password"
                aria-label="Password"
                aria-describedby="addon-wrapping"
              />
            </div>

            <button className="btn btn-success log-btn">Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
