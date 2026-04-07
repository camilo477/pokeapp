from django.urls import path
from .views import pokemon_detail

urlpatterns = [
    path("pokemon/<str:name>/", pokemon_detail, name="pokemon-detail"),
]