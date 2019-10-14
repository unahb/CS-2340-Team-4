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

    distances_and_costs = {}
    distance_set = game.get_universe().get_region_distances().get_distances(player.get_region().get_name())

    player_region = {
        'name' : player.get_region().get_name(),
        'tech_level' : player.get_region().get_tech_level(),
        'x_coordinate' : player.get_region().get_coordinates()[0],
        'y_coordinate' : player.get_region().get_coordinates()[1],
        'market' : player.get_region_market_adjusted_prices()
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
            'name' : name,
            'tech_level' : region.get_tech_level(),
            'x_coordinate' : region.get_coordinates()[0],
            'y_coordinate' : region.get_coordinates()[1],
            'market' : region.get_market(),
            'distance' : distance_set[region.get_name()],
            'fuel_cost' : player.get_fuel_costs()[region.get_name()]
        }
        planets_dict[name] = item

    json_dictionary['Player'] = player_item
    json_dictionary['Ship'] = ship_item
    json_dictionary['Planets'] = planets_dict

    return json.jsonify(json_dictionary)
