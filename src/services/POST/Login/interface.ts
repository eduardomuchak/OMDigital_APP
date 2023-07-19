export namespace PostLogin {
  export interface Employee {
    datetime: string;
    demission_date: string | null;
    document: string;
    email: string;
    function_id: string;
    id: number;
    man_power_id: string | null;
    name: string;
    obs: string | null;
    phone: string;
    resp_id: number;
    st: boolean;
    st_user: boolean;
    user_description: string | null;
  }

  export interface User {
    datetime: string;
    id: number;
    permission_type_id: number;
    permission_type_name: string;
    recovery_password: number;
    register_id: number;
    register_name: string;
    resp_id: number;
    st: boolean;
    user_control_type_id: number;
    user_type_id: number;
    user_type_name: string;
    username: string;
  }

  export interface Response {
    return: {
      employee: Employee;
      user: User;
    };
    status: boolean;
  }
}
