import User from "../entities/User";

interface IResponse {
  user: User;
  error?: string;    
}

export default IResponse;
