from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

class AccountManager(BaseUserManager):
    def create_user(self, email, username, first, last, password=None):
        if not email:
            raise ValueError('Email address required')
        if not username:
            raise ValueError('Username required')
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            first=first,
            last=last
        )
        user.set_password(password)
        user.save(using=self._db)
        return user


    def create_superuser(self, email, username, first, last, password=None):
        user = self.create_user(email=email, username=username, first=first, last=last, password=password)
        user.is_admin = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True
    )
    USERNAME_FIELD = 'email'  # specifies that email is the primary identifier for users
    username = models.CharField(max_length=30, unique=True)
    is_admin = models.BooleanField(default=False)
    first = models.CharField(max_length=64, blank=False, default='Not specified')
    last = models.CharField(max_length=64, blank=False, default='Not specified')
    is_active = models.BooleanField(default=True)

    # avitar = models.ImageField(null=True, blank=True, upload_to='dev/media/')
    # follows = models.ManyToManyField('self', related_name='followers', symmetrical=False)

    objects = AccountManager()
    REQUIRED_FIELDS = ['username', 'first', 'last']

    def __str__(self):
        return f"{self.first} {self.last} ({self.username})"

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True


    @property
    def is_staff(self):
        return self.is_admin
