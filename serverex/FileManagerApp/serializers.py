from django.utils import timezone
from rest_framework import serializers
from .models import Directory, File, AccessLink



class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'user', 'file', 'name', 'file_size', 'directory', 'is_public']
        read_only_fields = ['file_size']


class DirectorySerializer(serializers.ModelSerializer):
    files = FileSerializer(many=True, read_only=True)
    item_count = serializers.SerializerMethodField()

    class Meta:
        model = Directory
        fields = ['id', 'name', 'parent_directory', 'is_public', 'user', 'files', 'item_count']
        read_only_fields = ['user']

    def get_item_count(self, obj):
        """Возвращает количество файлов и подкаталогов в директории."""
        return obj.get_file_count()



class AccessLinkSerializer(serializers.ModelSerializer):
    directory = serializers.StringRelatedField(read_only=True)
    directory_id = serializers.PrimaryKeyRelatedField(queryset=Directory.objects.all(), source='directory', write_only=True)

    class Meta:
        model = AccessLink
        fields = '__all__'

    def validate(self, data):
        # Проверяем, что дата истечения в будущем
        if data['expiration_date'] <= timezone.now():
            raise serializers.ValidationError("Дата истечения не может быть в прошлом.")
        return data

    def create(self, validated_data):
        # Получаем пользователя из контекста запроса
        user = self.context['request'].user
        validated_data.pop('user', None)

        # Создаем объект AccessLink, передавая directory и другие данные
        return AccessLink.objects.create(user=user, **validated_data)




