from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import ForeignKey

from app.database import Base


class Employee(Base):
    __tablename__ = "employees"

    employee_id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    restaurant_id = Column(
        Integer,
        ForeignKey("restaurants.restaurant_id")
    )

    employee_name = Column(String)

    role = Column(String)

    phone = Column(String)

    email = Column(String)

    salary = Column(Float)

    joining_date = Column(String)

    status = Column(String)