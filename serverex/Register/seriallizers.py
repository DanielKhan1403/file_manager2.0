from django.contrib.auth.tokens import default_token_generator
from Register.models import CustomUser,OneTimeCode
from django.utils import timezone
from rest_framework import serializers
from django.core.mail import send_mail
import pyotp
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'date_joined', 'date_of_birth')

    def create(self, validated_data):
        user = CustomUser.objects.create(
            username=validated_data['username'],
            date_of_birth=validated_data['date_of_birth'],
            email=validated_data['email'],
            is_active=False,
        )
        user.set_password(validated_data['password'])
        user.save()

        self.send_one_time_code(user)
        return user

    def send_one_time_code(self, user):
        # Удаляем старые коды, если они есть
        OneTimeCode.objects.filter(user=user).delete()  # Удаляем все старые коды

        totp = pyotp.TOTP(pyotp.random_base32(), digits=6)
        code = totp.now()

        # Создаём новый одноразовый код для пользователя
        one_time_code = OneTimeCode.objects.create(user=user, code=code)

        # Отправляем одноразовый код пользователю на email
        send_mail(
            'Ваш одноразовый код',
            f'Ваш одноразовый код для подтверждения аккаунта: {code}',
            'from@example.com',
            [user.email],
            fail_silently=False,
        )

    def validate(self, data):
        # Проверка на дату рождения
        if data['date_of_birth'] >= timezone.now().date():
            raise serializers.ValidationError({'date_of_birth': 'Дата рождения не может быть больше текущей'})

        # Проверка на уникальность email
        if CustomUser.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({'email': 'Пользователь с таким email уже существует'})

        # Проверка на уникальность username
        if CustomUser.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError({'username': 'Пользователь с таким именем уже существует'})

        return data



class ResendCodeSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            user = CustomUser.objects.get(email=value)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("Пользователь с таким email не найден.")
        return value

    def send_new_code(self):
        email = self.validated_data['email']
        user = CustomUser.objects.get(email=email)

        if user.is_active:
            raise serializers.ValidationError({"message":"Этот аккаунт уже подтвержден."})

        serializer = RegisterSerializer()
        serializer.send_one_time_code(user)
        return {"detail": "Новый одноразовый код отправлен на ваш email."}

class VerifyCodeSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6)

    def validate(self, data):
        # Получаем пользователя по email
        try:
            user = CustomUser.objects.get(email=data['email'])
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("Пользователь с таким email не найден.")

        # Получаем одноразовый код, связанный с пользователем
        try:
            one_time_code = OneTimeCode.objects.get(user=user)
        except OneTimeCode.DoesNotExist:
            raise serializers.ValidationError("Не найден одноразовый код для этого пользователя.")

        # Проверка совпадения кода
        if one_time_code.code != data['code']:
            raise serializers.ValidationError("Неверный одноразовый код.")



        return data

    def verify_code(self):
        # Уже полученный и проверенный email из validated_data
        email = self.validated_data['email']
        user = CustomUser.objects.get(email=email)

        # Активируем пользователя
        user.is_active = True
        user.save()
        return user


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            user = CustomUser.objects.get(email=value)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("Пользователь с таким email не найден.")
        return value

    def send_reset_email(self):
        user = CustomUser.objects.get(email=self.validated_data['email'])
        token = default_token_generator.make_token(user)
        reset_link = f"http://localhost:3000/reset-password/{user.pk}/{token}/"


        send_mail(
            "Восстановление пароля",
            f"Чтобы сбросить пароль, перейдите по ссылке: {reset_link}",
            'from@example.com',
            [user.email],
            fail_silently=False,
        )

class PasswordResetConfirmSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            user = CustomUser.objects.get(pk=data['user_id'])
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("Пользователь не найден.")

        if not default_token_generator.check_token(user, data['token']):
            raise serializers.ValidationError("Неверный токен.")

        return data

    def set_new_password(self):
        user = CustomUser.objects.get(pk=self.validated_data['user_id'])
        user.set_password(self.validated_data['new_password'])
        user.save()