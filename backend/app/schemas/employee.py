from pydantic import BaseModel


class EmployeeBase(BaseModel):

    restaurant_id: int

    employee_name: str

    role: str

    phone: str

    email: str

    salary: float

    joining_date: str

    status: str


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeResponse(EmployeeBase):

    employee_id: int

    class Config:
        from_attributes = True