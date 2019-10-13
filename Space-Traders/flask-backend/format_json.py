from flask import json
# Takes universe, player, and difficulty

# Frontend needs to display List of regions
# Each region's name, coordinates, and tech level
# Display player skills and location

def get_json(game):
    json_dictionary = {}

    regions = game.get_universe().get_game_regions()
    player = game.get_player()
    ship = game.get_ship()

    player_region = {
        'region_name' : player.get_region().get_name(),
        'region_x_coordinate' : player.get_region().get_coordinates()[0],
        'region_y_coordinate' : player.get_region().get_coordinates()[1],
        'region_tech_level' : player.get_region().get_tech_level(),
        'region_market' : player.get_region().get_market()
    }
    player_item = {
        'name' : player.get_name(),
        'difficulty' : game.get_difficulty(),
        'credits' : player.get_credits(),
        'skills' : player.get_attributes(),
        'region' : player_region
    }

    ship_item = {
        'type' : ship.get_type(),
        'max_cargo_space' : ship.get_max_cargo_space(),
        'max_fuel_capacity' : ship.get_max_fuel_capacity(),
        'max_health' : ship.get_max_health(),
        'cargo' : ship.get_cargo(),
        'current_fuel' : ship.get_current_fuel(),
        'current_health' : ship.get_current_health()
    }

    planets_dict = {}
    for name, region in regions.items():
        item = {
            'tech_level' : region.get_tech_level(),
            'x_coordinate' : region.get_coordinates()[0],
            'y_coordinate' : region.get_coordinates()[1],
            'market' : region.get_market()
        }
        planets_dict[name] = item

    json_dictionary["Player"] = player_item
    json_dictionary["Ship"] = ship_item
    json_dictionary["Planets"] = planets_dict

    return json.jsonify(json_dictionary)
