from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager 


class UserManager(BaseUserManager):
    def create_user(self, username, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not username:
            raise ValueError("Users must have an email address")

        user = self.model(
            username=username,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            username=username,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    username = models.CharField(max_length=32, unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "username"

    def __str__(self):
        return str(self.username)

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


class Settings(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    first_name = models.CharField(max_length=32,null=True)
    last_name = models.CharField(max_length=32,null=True)
    email = models.CharField(max_length=32,null=True)
    number = models.CharField(max_length=16,null=True)
    admin = models.BooleanField(default=False,null=True)

class Note(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL, null=True)
    text = models.CharField(max_length=200)
    public = models.BooleanField(default=True)
    

