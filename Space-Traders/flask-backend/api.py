from flask import Flask, render_template
from flask_restful import reqparse, Api, Resource

import game
import format_json

app = Flask(__name__)
api = Api(app)

#Why does this exist? Because PyLint is stupid and we don't have a DB
class SpaceTradersContainer:
    space_traders = game.Game()

    #these functions actually do nothing but pylint demands more than 1 function
    def lol(self):
        return 'lol'

    def lole(self):
        return 'lole'

@app.route("/")
def my_index():
    return render_template("index.html")

class SpaceTraders(Resource):
    def get(self):
        print(SpaceTradersContainer.space_traders)
        return format_json.get_json(SpaceTradersContainer.space_traders)

    def post(self):
        #expect a POST in the form of
        #'{"difficulty":"string", "attributes":"int,int,int,int", "name":"string"}'
        #POST request should be formatted with a JSON payload
        parser = reqparse.RequestParser()
        parser.add_argument('difficulty', type=str, required=True)
        parser.add_argument('attributes', type=list, required=True)
        parser.add_argument('name', type=str, required=True)
        args = parser.parse_args()

        #parse attributes as a list since it comes in as a string with comma delimiters
        attributes = []
        builder = ''
        for i, char in enumerate(args['attributes']):
            if not char == ',':
                builder += char
            else:
                print(builder)
                attributes.append(int(builder))
                builder = ''
            if i == (len(args['attributes']) - 1):
                attributes.append(int(builder))

        #pylint_passer = game.Game()
        SpaceTradersContainer.space_traders = game.Game(difficulty=args['difficulty'],
                                                        attributes=attributes,
                                                        name=args['name'])

        return 200


class Travel(Resource):
    def put(self, planet_id):
        SpaceTradersContainer.space_traders.travel(planet_id)
        return 200


##
# Actually setup the Api resource routing here
##

api.add_resource(Travel, '/Space-Traders/travel/<planet_id>')
api.add_resource(SpaceTraders, '/Space-Traders')


if __name__ == '__main__':
    app.run(debug=True)
