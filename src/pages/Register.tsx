import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { TUser } from "../interfaces/TUser";
import instance from "../services/api";

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(255),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUser>({
    resolver: joiResolver(userSchema),
  });
  const onSubmit = (user: TUser) => {
    (async () => {
      const { data } = await instance.post("/register", user);
      console.log(data);
    })();
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Register</h1>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && (
              <div className="text-danger">{errors.email.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
            {errors.password && (
              <div className="text-danger">{errors.password.message}</div>
            )}
          </div>
          <button className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Register;
