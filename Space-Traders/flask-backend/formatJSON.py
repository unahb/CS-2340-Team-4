import json
import game

from flask import json as flaskjson
# Takes universe, player, and difficulty

# Frontend needs to display List of regions
# Each region's name, coordinates, and tech level
# Display player skills and location

# Game -> 

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

    #print(data)
    #json_data = json.dumps(data)
    #print(json_data)
    return flaskjson.jsonify(data)

    
    #     json_coordinates = json.dumps(regions[region].get_coordinates()) #wrap json.dumps
    #     json_tech_level = json.dumps(regions[region].get_tech_level()) #wrap json.dumps
    #     uni_dict[region] = json.dumps({json_coordinates, json_tech_level})
    
    # player_dict['attributes'] = json.dumps(Game.get_player().get_attributes())
    # player_dict['region'] = json.dumps(Game.get_player().get_region())
    # player_dict['credits'] = json.dumps(Game.get_player().get_credits())

    # json_dict['Player'] = json.dumps(player_dict)
    # json_dict['Universe'] = json.dumps(uni_dict)
    # # json_data = json.dumps(json_dict)
    # print(json.dumps(player_dict))
    # print(json.dumps(uni_dict))
    

 