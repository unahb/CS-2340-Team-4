import random 

from flask import Flask, request
from flask_restful import reqparse, abort, Api, Resource

import game
import formatJSON

app = Flask(__name__)
api = Api(app)

space_traders = game.Game('easy', [1,1,1,1]) #TODO: make cleaner

class SpaceTraders(Resource):
    def get(self):
        print(space_traders)
        return formatJSON.get_json(space_traders) 

    def post(self):
        #expect a POST in the form of '{"difficulty":"string", "attributes":"int, int, int, int"}'
        parser = reqparse.RequestParser()
        parser.add_argument('difficulty', type=str, required=True)
        parser.add_argument('attributes', type=list, required=True)
        args = parser.parse_args()

        attributes = []
        builder = ''
        for i, char in enumerate(args['attributes']):
            print(char)
            if i == (len(args['attributes']) - 1):
                builder += char
                attributes.append(int(builder))
            elif not char == ',':
                builder += char
                print('not delimiter')    
            else:
                attributes.append(int(builder))
                builder = ''
        
        global space_traders
        space_traders = game.Game(args['difficulty'], attributes)
         

        return 200 


class Travel(Resource):
    def put(self, planet_id):
        space_traders.travel(planet_id)
        return 200


##
# Actually setup the Api resource routing here
##

api.add_resource(Travel, '/Space-Traders/travel/<planet_id>')
api.add_resource(SpaceTraders, '/Space-Traders')


if __name__ == '__main__':
    app.run(debug=True)
