from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from app.schemas.profile_schema import ProfileUpdate
from app.database import SessionLocal

from app.models.user import User
from app.models.restaurant import Restaurant

from app.schemas.user_schema import (UserRegister, UserLogin, ChangePassword,)

from app.utils.security import (
    hash_password,
    verify_password,
    create_access_token,
)

router = APIRouter(
    tags=["Authentication"]
)


# ============================================
# Database Dependency
# ============================================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ============================================
# Register
# ============================================
@router.post("/register")
def register(user: UserRegister):

    db = SessionLocal()

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        db.close()
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    restaurant = (
        db.query(Restaurant)
        .filter(
            Restaurant.restaurant_id == user.restaurant_id
        )
        .first()
    )

    if not restaurant:
        db.close()
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found"
        )

    new_user = User(
        restaurant_id=user.restaurant_id,
        name=user.name,
        email=user.email,
        hashed_password=hash_password(user.password),
        role=user.role,
        phone=user.phone,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    db.close()

    return {
        "message": "User registered successfully"
    }


# ============================================
# Login
# ============================================
@router.post("/login")
def login(user: UserLogin):

    db = SessionLocal()

    db_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if not db_user:
        db.close()
        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    if not verify_password(
        user.password,
        db_user.hashed_password
    ):
        db.close()
        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    restaurant = (
        db.query(Restaurant)
        .filter(
            Restaurant.restaurant_id == db_user.restaurant_id
        )
        .first()
    )

    token = create_access_token(
        {
            "sub": db_user.email,
            "role": db_user.role,
        }
    )

    response = {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "name": db_user.name,
            "email": db_user.email,
            "phone": db_user.phone,
            "role": db_user.role,
            "restaurant_id": db_user.restaurant_id,
            "restaurant_name": restaurant.restaurant_name if restaurant else ""
        }
    }

    db.close()

    return response

# ==========================================

# ===========================================
@router.put("/change-password")
def change_password(data: ChangePassword):

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:
        db.close()
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(
        data.old_password,
        user.hashed_password
    ):
        db.close()
        raise HTTPException(
            status_code=400,
            detail="Old password is incorrect"
        )

    user.hashed_password = hash_password(
        data.new_password
    )

    db.commit()

    db.close()

    return {
        "message": "Password changed successfully"
    }
# ==========================================
# Get Profile
# ==========================================
@router.get("/profile/{user_id}")
def get_profile(user_id: int):

    db = SessionLocal()

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        db.close()
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    restaurant_name = ""

    if user.restaurant:
        restaurant_name = user.restaurant.restaurant_name

    data = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "role": user.role,
        "restaurant_id": user.restaurant_id,
        "restaurant_name": restaurant_name
    }

    db.close()

    return data


# ==========================================
# Update Profile
# ==========================================
@router.put("/profile/{user_id}")
def update_profile(
    user_id: int,
    profile: ProfileUpdate
):

    db = SessionLocal()

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        db.close()
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.name = profile.name
    user.phone = profile.phone

    db.commit()
    db.refresh(user)

    restaurant_name = ""

    if user.restaurant:
        restaurant_name = user.restaurant.restaurant_name

    data = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "role": user.role,
        "restaurant_id": user.restaurant_id,
        "restaurant_name": restaurant_name
    }

    db.close()

    return {
        "message": "Profile Updated Successfully",
        "user": data
    }