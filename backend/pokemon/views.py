import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response

POKEAPI_BASE_URL = "https://pokeapi.co/api/v2/pokemon"


@api_view(["GET"])
def pokemon_detail(request, name):
    url = f"{POKEAPI_BASE_URL}/{name.lower()}"
    response = requests.get(url, timeout=10)

    if response.status_code != 200:
        return Response(
            {"error": "Pokémon no encontrado"},
            status=response.status_code,
        )

    data = response.json()

    transformed = {
        "id": data["id"],
        "name": data["name"],
        "height": data["height"],
        "weight": data["weight"],
        "base_experience": data["base_experience"],
        "types": sorted([item["type"]["name"] for item in data["types"]]),
        "abilities": sorted([item["ability"]["name"] for item in data["abilities"]]),
        "stats": sorted(
            [
                {
                    "name": item["stat"]["name"],
                    "value": item["base_stat"],
                }
                for item in data["stats"]
            ],
            key=lambda x: x["name"],
        ),
        "sprite": data["sprites"]["front_default"],
        "official_artwork": data["sprites"]["other"]["official-artwork"]["front_default"],
    }

    return Response(transformed)