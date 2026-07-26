from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.employee import Employee
from app.schemas.employee import (
    EmployeeCreate,
    EmployeeResponse,
)

router = APIRouter(
    prefix="/employees",
    tags=["Employees"],
)
@router.get(
    "/",
    response_model=list[EmployeeResponse],
)
def get_employees(
    db: Session = Depends(get_db),
):

    employees = (
        db.query(Employee)
        .all()
    )

    return employees
@router.get(
    "/{employee_id}",
    response_model=EmployeeResponse,
)
def get_employee(
    employee_id: int,
    db: Session = Depends(get_db),
):

    employee = (
        db.query(Employee)
        .filter(
            Employee.employee_id
            == employee_id
        )
        .first()
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found",
        )

    return employee
@router.post(
    "/",
    response_model=EmployeeResponse,
)
def create_employee(
    employee: EmployeeCreate,
    db: Session = Depends(get_db),
):

    new_employee = Employee(
        **employee.model_dump()
    )

    db.add(new_employee)

    db.commit()

    db.refresh(new_employee)

    return new_employee
@router.put(
    "/{employee_id}",
    response_model=EmployeeResponse,
)
def update_employee(
    employee_id: int,
    employee: EmployeeCreate,
    db: Session = Depends(get_db),
):

    existing_employee = (
        db.query(Employee)
        .filter(
            Employee.employee_id == employee_id
        )
        .first()
    )

    if not existing_employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found",
        )

    for key, value in employee.model_dump().items():
        setattr(existing_employee, key, value)

    db.commit()

    db.refresh(existing_employee)

    return existing_employee
@router.get(
    "/restaurant/{restaurant_id}",
    response_model=list[EmployeeResponse],
)
def get_employees_by_restaurant(
    restaurant_id: int,
    db: Session = Depends(get_db),
):

    employees = (
        db.query(Employee)
        .filter(
            Employee.restaurant_id == restaurant_id
        )
        .all()
    )

    return employees