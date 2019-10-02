from flask import json
# Takes universe, player, and difficulty

# Frontend needs to display List of regions
# Each region's name, coordinates, and tech level
# Display player skills and location

def get_json(game):
    data = [] # empty list

    regions = game.get_universe().get_game_regions()
    player = game.get_player()

    player_item = {
        'difficulty' : game.get_difficulty(),
        'skills' : player.get_attributes(),
        'location' : player.get_region(),
        'credits' : player.get_credits(),
        'name' : player.get_name()
    }
    data.append(player_item)

    for region in regions:
        item = {
            'name' : region,
            'x-coordinate' : regions[region].get_coordinates()[0],
            'y-coordinate' : regions[region].get_coordinates()[1],
            'tech-level' : regions[region].get_tech_level()
        }
        data.append(item)

    return json.jsonify(data)
