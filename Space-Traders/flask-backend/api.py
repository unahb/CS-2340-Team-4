import random 

from flask import Flask, request
from flask_restful import reqparse, abort, Api, Resource

import game

app = Flask(__name__)
api = Api(app)

space_traders = game.Game('easy', [1,1,1,1]) #TODO: make cleaner

class SpaceTraders(Resource):
    def get(self):
        print(space_traders)
        return '' #TODO add in return for JSON

    def post(self):
        #expect a POST in the form of 'difficulty=string attributes=[int, int, int, int]'
        parser = reqparse.RequestParser()
        parser.add_argument('difficulty', type=str, required=True, location='form')
        parser.add_argument('attributes', type=list, required=True, location='form')
        args = parser.parse_args()

        space_traders = game.Game(args['difficulty'], args['attributes'])

        return '', 200 #TODO add in return for JSON


class Travel(Resource):
    def put(self, planet_id):
        space_traders.travel(planet_id)
        return '', 200 #TODO add in return for JSON


##
# Actually setup the Api resource routing here
##

api.add_resource(Travel, '/Space-Traders/travel/<planet_id>')
api.add_resource(SpaceTraders, '/Space-Traders')


if __name__ == '__main__':
    app.run(debug=True)
